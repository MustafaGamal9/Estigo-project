import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NgFor } from '@angular/common'; // Import NgFor directive

interface ApiResponse { // Interface for the entire API response
  results: Instructor[];
  info: any; // Or define a more specific interface for 'info' if needed
}

interface Instructor { // Interface for each instructor object in 'results'
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    city: string;
  };
  picture: {
    medium: string; // Or 'large' if you prefer larger images
    thumbnail: string;
  };
  // Add other fields you want to use from the API response
}

@Component({
  selector: 'app-instructors-section',
  standalone: true,
  imports: [],
  templateUrl: './instructors-section.component.html',
  styleUrl: './instructors-section.component.css',
})
export class InstructorsSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('instructorsCarousel', { static: false }) instructorsCarousel!: ElementRef;
  instructors: Instructor[] = [];
  private apiUrl = 'http://localhost:5070/api/Teacher/HomepageTeachers';

  constructor() { }

  ngOnInit(): void {
    this.fetchInstructors();
  }

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  initializeCarousel() {
    const carousel = this.instructorsCarousel.nativeElement;
    const cards = carousel.querySelectorAll('.instructor-card');

    if (!cards.length) return;
  }

  async fetchInstructors(): Promise<void> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ApiResponse = await response.json() as ApiResponse; 
      this.instructors = data.results; 
    } catch (error) {
      console.error('Error fetching instructors:', error);
    }
  }
}