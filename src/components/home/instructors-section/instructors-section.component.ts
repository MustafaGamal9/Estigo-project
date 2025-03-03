import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-instructors-section',
  imports: [],
  templateUrl: './instructors-section.component.html',
  styleUrl: './instructors-section.component.css'
})
export class InstructorsSectionComponent {
  @ViewChild('instructorsCarousel', { static: false }) instructorsCarousel!: ElementRef;

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  initializeCarousel() {
    const carousel = this.instructorsCarousel.nativeElement;
    const cards = carousel.querySelectorAll('.instructor-card');

    if (!cards.length) return;
  }

}
