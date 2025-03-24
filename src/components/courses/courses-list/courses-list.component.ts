import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  title: string;
  subject: string;
  price: number;
  instrctorName : string;
  grade: string;

}

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']

})
export class CoursesListComponent implements OnInit {
  courses: Course[] = [];
  allCourses: Course[] = []; 


  ngOnInit(): void {
    this.fetchCourses();
  }

  async fetchCourses() {
    try {
      const response = await fetch("https://localhost:7092/api/Course");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const coursesData: Course[] = await response.json();
      this.allCourses = coursesData; 
      this.courses = coursesData;      
      console.log('Courses data:', this.courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
}