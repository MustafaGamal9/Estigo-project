import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, PLATFORM_ID, inject, ChangeDetectorRef, NgZone } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Subscription, catchError, map, of, tap, finalize } from 'rxjs';
// Optional: If you plan to navigate away in finishQuiz
// import { Router } from '@angular/router';

// Interface matching the API response structure
interface ApiQuestion {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
}

// Modified internal interface (no correctOption)
interface QuizQuestion {
  id: number; // Generated based on index
  text: string;
  options: { letter: string; text: string }[];
}

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule], // HttpClient is provided globally
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit, OnDestroy {
  // --- Injected Services ---
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private cdRef = inject(ChangeDetectorRef); // For manual change detection
  private ngZone = inject(NgZone); // For timer running outside Angular zone if needed (optional optimization)
  // Optional: private router = inject(Router);

  // --- Configuration ---
  readonly quizTitle = 'Object Oriented Programming - Midterm Quiz';
  readonly timeLimitMinutes = 15;
  private readonly questionsApiUrl = 'https://est.runasp.net/api/Exam/QuestionsWithoutAnswer/12';

  // --- Component State ---
  questions: QuizQuestion[] = [];
  totalQuestions: number = 0;
  currentQuestionIndex: number = 0;
  userAnswers: { [key: number]: string } = {};
  timeRemaining: number = this.timeLimitMinutes * 60;
  timerDisplay: string = this.formatTime(this.timeRemaining);
  quizSubmitted: boolean = false;
  isReviewing: boolean = false;
  isLoading: boolean = true; // Start in loading state
  errorMessage: string | null = null;

  // --- Private Properties ---
  private timerInterval: any = null; // Using 'any' for NodeJs.Timeout compatibility
  private questionSubscription: Subscription | null = null;
  private readonly componentId = `QuizComponent_${Math.random().toString(36).substring(2, 9)}`; // For unique logging

  constructor() {
    console.log(`${this.componentId}: Constructor`);
  }

  ngOnInit(): void {
    console.log(`${this.componentId}: ngOnInit - Calling loadQuestions`);
    this.loadQuestions();
  }

  ngOnDestroy(): void {
    console.log(`${this.componentId}: ngOnDestroy`);
    this.clearTimer();
    this.questionSubscription?.unsubscribe();
  }

  loadQuestions(): void {
    console.log(`${this.componentId}: loadQuestions - START`);
    this.isLoading = true;
    this.errorMessage = null;
    this.questions = []; // Reset questions array
    this.totalQuestions = 0;
    this.currentQuestionIndex = 0;
    this.userAnswers = {};
    this.quizSubmitted = false;
    this.isReviewing = false;
    this.clearTimer(); // Stop any previous timer
    this.timeRemaining = this.timeLimitMinutes * 60; // Reset timer value
    this.updateTimerDisplay(); // Update display for reset timer

    // Force UI update for loading state *before* async operation
    this.cdRef.detectChanges();

    console.log(`${this.componentId}: loadQuestions - Attempting fetch from ${this.questionsApiUrl}`);

    this.questionSubscription?.unsubscribe(); // Ensure previous sub is cleaned up

    this.questionSubscription = this.http.get<ApiQuestion[]>(this.questionsApiUrl)
      .pipe(
        map(apiQuestions => {
          console.log(`${this.componentId}: loadQuestions - map - API Response Received:`, apiQuestions);
          try {
            // Added explicit check for array structure before mapping
            if (!Array.isArray(apiQuestions)) {
                console.error(`${this.componentId}: loadQuestions - map - Invalid data format received. Expected array, got:`, typeof apiQuestions);
                throw new Error('Invalid data format from API.'); // Throw error to be caught
            }
            return this.transformApiData(apiQuestions);
          } catch (transformError) {
            console.error(`${this.componentId}: loadQuestions - map - Error during transformApiData:`, transformError);
            throw transformError; // Re-throw to trigger catchError
          }
        }),
        tap(transformedQuestions => {
          console.log(`${this.componentId}: loadQuestions - tap - Data Transformed:`, transformedQuestions);
          this.questions = transformedQuestions;
          this.totalQuestions = this.questions.length;

          if (this.totalQuestions > 0) {
            console.log(`${this.componentId}: loadQuestions - tap - Questions found (${this.totalQuestions}). Calling startQuiz.`);
            this.startQuiz(); // Call startQuiz only if questions exist
          } else {
            console.log(`${this.componentId}: loadQuestions - tap - No questions received from server or after transform.`);
            this.errorMessage = "No questions available for this quiz.";
            // If no questions, we are technically no longer "loading" data
            this.isLoading = false;
          }
          console.log(`${this.componentId}: loadQuestions - tap - SUCCESS path finished. Setting isLoading = false`);
           this.isLoading = false; // Set loading false on successful path completion
           this.cdRef.detectChanges(); // Trigger change detection for UI update
        }),
        catchError((error: HttpErrorResponse | Error) => {
          console.error(`${this.componentId}: loadQuestions - catchError - ERROR caught:`, error);
          if (error instanceof HttpErrorResponse) {
            if (error.status === 0) {
              this.errorMessage = "Cannot connect to the server. Please check your network connection or if the server is running.";
            } else {
              this.errorMessage = `Failed to load questions. Server responded with status ${error.status}. Please try again later.`;
            }
          } else {
            // Handle errors from map/tap (like transform error or other JS errors)
            this.errorMessage = `An error occurred while processing quiz data: ${error.message}`;
          }
          this.questions = []; // Ensure clean state on error
          this.totalQuestions = 0;
          console.log(`${this.componentId}: loadQuestions - catchError - Setting isLoading = false`);
          this.isLoading = false; // Stop loading on error
          this.cdRef.detectChanges(); // Trigger change detection for UI update (show error)
          return of([]); // Return empty observable to allow stream completion
        }),
        finalize(() => {
          // This block runs regardless of success or error, after tap/catchError
          console.log(`${this.componentId}: loadQuestions - finalize - Observable stream finished.`);
          // Safety check: Ensure isLoading is false if somehow missed
          if (this.isLoading) {
             console.warn(`${this.componentId}: loadQuestions - finalize - isLoading was still true! Forcing false.`);
             this.isLoading = false;
             this.cdRef.detectChanges();
          }
        })
      )
      .subscribe({
         // We don't need 'next' because 'tap' handles the side effect of processing data
         // We don't need 'error' because 'catchError' handles it
         complete: () => {
             // This runs ONLY if the observable completes successfully (no error thrown/caught)
             console.log(`${this.componentId}: loadQuestions - subscribe - Observable COMPLETED successfully.`);
         }
      });
  }

  // Helper to transform API data to internal format
  private transformApiData(apiQuestions: ApiQuestion[]): QuizQuestion[] {
     console.log(`${this.componentId}: transformApiData - Transforming ${apiQuestions?.length ?? 0} items.`);
    // Already checked for array in map, but double-check doesn't hurt.
    if (!Array.isArray(apiQuestions)) { return []; }

    return apiQuestions.map((apiQ, index) => {
        // Basic validation of expected properties
        if (typeof apiQ?.questionText !== 'string' || typeof apiQ?.optionA !== 'string' || /* ... add checks for B, C, D */ typeof apiQ?.optionD !== 'string') {
            console.warn(`${this.componentId}: transformApiData - Skipping item at index ${index} due to missing properties:`, apiQ);
            return null; // Mark invalid items
        }
        return {
            id: index + 1, // Generate an ID (using 1-based index)
            text: apiQ.questionText,
            options: [
                { letter: 'A', text: apiQ.optionA },
                { letter: 'B', text: apiQ.optionB },
                { letter: 'C', text: apiQ.optionC },
                { letter: 'D', text: apiQ.optionD },
            ],
        };
    }).filter(q => q !== null) as QuizQuestion[]; // Filter out any invalid items
  }


  startQuiz(): void {
    console.log(`${this.componentId}: startQuiz - Initializing quiz state.`);
    // State reset is mostly done in loadQuestions, ensure essentials here
    this.currentQuestionIndex = 0;
    this.quizSubmitted = false;
    this.isReviewing = false;
    this.timeRemaining = this.timeLimitMinutes * 60; // Ensure timer value is reset
    this.updateTimerDisplay(); // Update display
    this.startQuizTimer(); // Start the timer
    console.log(`${this.componentId}: startQuiz - Quiz ready.`);
    this.cdRef.detectChanges(); // Update UI if needed after state changes
  }

  startQuizTimer(): void {
    this.clearTimer(); // Ensure no duplicate timers run

    if (isPlatformBrowser(this.platformId)) {
        console.log(`${this.componentId}: startQuizTimer - Starting timer interval.`);
        // Running the interval outside Angular zone can prevent unnecessary change detection cycles on each tick
        this.ngZone.runOutsideAngular(() => {
             this.timerInterval = setInterval(() => {
                 if (this.timeRemaining > 0 && !this.quizSubmitted) {
                     this.timeRemaining--;
                     // Update display needs to run back inside Angular zone to trigger UI update
                     this.ngZone.run(() => {
                         this.updateTimerDisplay();
                     });
                 } else if (this.timeRemaining <= 0 && !this.quizSubmitted) {
                     console.log(`${this.componentId}: startQuizTimer - Time is up! Auto-submitting.`);
                     // Auto-submit needs to run inside Angular zone for state changes & UI updates
                     this.ngZone.run(() => {
                         this.submitQuiz(true); // Pass true for auto-submission
                     });
                     this.clearTimer(); // Stop timer immediately after triggering submit
                 } else {
                     // Timer should stop if quiz submitted early or already auto-submitted
                     // console.log(`${this.componentId}: startQuizTimer - Condition met to clear timer (submitted or time <= 0).`);
                     this.clearTimer();
                 }
             }, 1000);
        });
    } else {
        console.log(`${this.componentId}: startQuizTimer - Not starting timer (not in browser platform).`);
    }
  }

  clearTimer(): void {
    if (this.timerInterval) {
      // console.log(`${this.componentId}: clearTimer - Clearing timer interval.`);
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay(): void {
    const newDisplay = this.formatTime(this.timeRemaining);
    if (this.timerDisplay !== newDisplay) { // Avoid unnecessary updates if value hasn't changed
        this.timerDisplay = newDisplay;
        // Note: If called from outside zone (timer tick), cdRef might be needed, but ngZone.run() handles it.
        // this.cdRef.detectChanges(); // Usually not needed here if ngZone.run is used correctly
    }
  }

  selectOption(questionId: number, optionLetter: string): void {
    if (!this.quizSubmitted && !this.isReviewing) {
      console.log(`${this.componentId}: selectOption - QID: ${questionId}, Option: ${optionLetter}`);
      this.userAnswers[questionId] = optionLetter;
       // Optional: Trigger detection if selection should immediately update something else
       // this.cdRef.detectChanges();
    }
  }

  navigate(direction: 'prev' | 'next'): void {
    console.log(`${this.componentId}: navigate - Direction: ${direction}, CurrentIndex: ${this.currentQuestionIndex}`);
    const previousIndex = this.currentQuestionIndex;
    if (direction === 'prev' && !this.isFirstQuestion) {
      this.currentQuestionIndex--;
    } else if (direction === 'next' && !this.isLastQuestion) {
      this.currentQuestionIndex++;
    }
    if(previousIndex !== this.currentQuestionIndex) {
        // Optional: Trigger detection if navigation needs immediate UI update beyond default binding
        // this.cdRef.detectChanges();
    }
  }

  submitQuiz(autoSubmitted: boolean = false): void {
    if (this.quizSubmitted) {
      console.log(`${this.componentId}: submitQuiz - Already submitted.`);
      return;
    }

    console.log(`${this.componentId}: submitQuiz - Submitting. Auto: ${autoSubmitted}`);
    this.quizSubmitted = true;
    this.isReviewing = false;
    this.clearTimer(); // Stop the timer

    if (autoSubmitted) {
      this.timeRemaining = 0; // Ensure timer reads 00:00
      this.updateTimerDisplay();
      // Use alert or a more integrated notification system
      // Use setTimeout to avoid potential issues within current digest cycle
      setTimeout(() => alert('Time is up! Your answers have been submitted.'), 0);
    }

    console.log(`${this.componentId}: submitQuiz - Final Answers:`, this.userAnswers);
    // TODO: Implement API call to send answers to the backend if needed
    // this.http.post('/api/Exam/SubmitAnswers/11', this.userAnswers).subscribe(...)

    this.cdRef.detectChanges(); // Ensure UI reflects submitted state
  }

  reviewAnswers(): void {
    if (!this.quizSubmitted) {
        console.log(`${this.componentId}: reviewAnswers - Cannot review before submitting.`);
        return;
    }
    console.log(`${this.componentId}: reviewAnswers - Entering review mode.`);
    this.isReviewing = true;
    this.currentQuestionIndex = 0; // Start review from the first question
    this.cdRef.detectChanges();
  }

  finishQuiz(): void {
    console.log(`${this.componentId}: finishQuiz - Action triggered.`);
    // Option 1: Reset the component to allow retake
    this.loadQuestions(); // Reloads everything

    // Option 2: Navigate away (inject Router for this)
    // console.log(`${this.componentId}: finishQuiz - Navigating away.`);
    // this.router.navigate(['/dashboard']); // Example route

    // Option 3: Emit an event to a parent component
    // @Output() quizFinished = new EventEmitter<{[key: number]: string}>();
    // this.quizFinished.emit(this.userAnswers);
  }

  // --- Helper Getters ---
  get currentQuestionData(): QuizQuestion | null {
    if (this.questions.length > 0 && this.currentQuestionIndex >= 0 && this.currentQuestionIndex < this.totalQuestions) {
      return this.questions[this.currentQuestionIndex];
    }
    return null;
  }

  get progressPercentage(): number {
    return this.totalQuestions > 0 ? ((this.currentQuestionIndex + 1) / this.totalQuestions) * 100 : 0;
  }

  get isFirstQuestion(): boolean {
    return this.currentQuestionIndex === 0;
  }

  get isLastQuestion(): boolean {
    return this.totalQuestions > 0 && this.currentQuestionIndex === this.totalQuestions - 1;
  }

  // --- Methods for Template Class Bindings ---
  isSelected(questionId: number, optionLetter: string): boolean {
    return this.userAnswers[questionId] === optionLetter;
  }

  // --- Utility ---
  formatTime(totalSeconds: number): string {
    const safeSeconds = Math.max(0, Math.floor(totalSeconds)); // Ensure non-negative integer
    const minutes = Math.floor(safeSeconds / 60);
    const seconds = safeSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}