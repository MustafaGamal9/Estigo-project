import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Course {
  courseId: number;
  courseTitle: string;
  imageBase64: string;
  price: number;
  teacherName: string;
}

@Component({
  selector: 'app-physics',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './physics.component.html',
  styleUrl: './physics.component.css'
})
export class PhysicsComponent implements OnInit {
  courses: Course[] = [];

  constructor() {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await fetch('http://est.runasp.net/api/Course/category/limited/2');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Add data URL prefix to base64 images
      this.courses = data.map((course: Course) => ({
        ...course,
        imageBase64: `data:image/jpeg;base64,${course.imageBase64}`
      }));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
}
