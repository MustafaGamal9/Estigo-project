import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-popular-courses-section',
  imports: [],
  templateUrl: './popular-courses-section.component.html',
  styleUrl: './popular-courses-section.component.css'
})
export class PopularCoursesSectionComponent {
  @ViewChild('popularCoursesCarousel', { static: false }) popularCoursesCarousel!: ElementRef;

  ngAfterViewInit(): void {
    this.initializeCarousel();
  }

  initializeCarousel() {
    const carousel = this.popularCoursesCarousel.nativeElement;
    const cards = carousel.querySelectorAll('.course-card');

    if (!cards.length) return;

}}
