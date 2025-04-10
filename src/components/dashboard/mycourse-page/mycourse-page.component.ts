import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface LessonDetail {
  lessonTitle: string;
  lessonVideo: string;
  examTitle: string | null;
}

// New interface for items displayed in the right-hand list
interface ContentListItem {
  type: 'lesson' | 'exam';
  title: string; // Display title (e.g., "Lesson 1: Intro" or "Exam: Intro")
  lessonRef: LessonDetail; // Reference back to the original lesson object
  index?: number; // Optional: lesson index for display
}

@Component({
  selector: 'app-mycourse-page',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './mycourse-page.component.html',
  styleUrls: ['./mycourse-page.component.css']
})
export class MycoursePageComponent implements OnInit {

  selectedCourseId: string | null = null;
  // courseDetails: LessonDetail[] = []; // Keep original data if needed elsewhere, but not primary for list
  contentList: ContentListItem[] = []; // This will populate the right-hand list

  selectedContentItem: ContentListItem | null = null; // The currently selected item from the right list
  isLoading: boolean = false;
  fetchError: string | null = null;
  videoUrl: SafeResourceUrl | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idFromRoute = params['id'];
      if (idFromRoute) {
        this.selectedCourseId = idFromRoute;
        this.getCourseDetails(idFromRoute);
      }
    });
  }

  getCourseDetails(courseId: string): void {
    const apiUrl = `http://est.runasp.net/api/Lesson/GetCourseDetails/${courseId}`;
    this.isLoading = true;
    this.fetchError = null;
    this.contentList = []; // Reset the display list
    this.selectedContentItem = null;

    this.http.get<LessonDetail[]>(apiUrl).subscribe({
      next: (response) => {
        this.buildContentList(response); // Process the response
        if (this.contentList.length > 0) {
          // Automatically select the first item (which should be the first lesson's video)
          this.selectContentItem(this.contentList[0]);
        } else {
          this.fetchError = 'No lessons or exams found for this course.';
        }
        this.isLoading = false;
      },

    });
  }

  // Transforms the API response into the structure needed for the right-hand list
  buildContentList(lessons: LessonDetail[]): void {
    this.contentList = [];
    lessons.forEach((lesson, index) => {
      // Add the Lesson item
      this.contentList.push({
        type: 'lesson',
        title: `${index + 1}. ${lesson.lessonTitle}`, // Add index to lesson title
        lessonRef: lesson,
        index: index + 1
      });
      // Add the Exam item *if* it exists
      if (lesson.examTitle) {
        this.contentList.push({
          type: 'exam',
          title: `Exam: ${lesson.examTitle}`, // Prefix exam title
          lessonRef: lesson
          // No separate index needed for exam, linked to lesson
        });
      }
    });
  }

  // Handles selecting ANY item from the right-hand list
  selectContentItem(item: ContentListItem): void {
    this.selectedContentItem = item;
    this.videoUrl = null; // Reset video URL initially

    if (item.type === 'lesson' && item.lessonRef.lessonVideo) {
      // Sanitize and set video URL only if it's a lesson with a video
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.lessonRef.lessonVideo);
    }
    console.log('Selected content:', this.selectedContentItem);
  }

  // Helper to check if an item in the list is the currently selected one
  isContentSelected(item: ContentListItem): boolean {
    return this.selectedContentItem === item;
  }

  // Get the main title to display in the left panel
  get displayTitle(): string {
    if (!this.selectedContentItem) return 'Select content';
    // Use the original lesson title for context, even when showing the exam
    return this.selectedContentItem.lessonRef.lessonTitle;
  }

}