import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

interface Course {
  courseId: number;
  courseTitle: string;
  imageBase64: string;
  price: number;
  teacherName: string;
}

@Component({
  selector: 'app-course-vm',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-vm.component.html',
  styleUrl: './course-vm.component.css'
})
export class CourseVmComponent implements OnInit {
  courses: Course[] = [];

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      const catID = params['id'];
      this.fetchCourseDetails(catID);
    });
  }

  async fetchCourseDetails(catID: number): Promise<void> {
    try {
      const response = await fetch(`http://est.runasp.net/api/Course/category/${catID}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.courses = data;
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
}
