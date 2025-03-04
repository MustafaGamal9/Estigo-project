import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses-search-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-section.component.html',
  styleUrl: './search-section.component.css'
})
export class CoursesSearchSectionComponent {
  @Output() searchFilterChanged = new EventEmitter<{ searchTerm: string, subject: string, grade: string }>();

  searchTerm: string = '';
  selectedSubject: string = '';
  selectedGrade: string = '';

  subjects = [
    { value: '', display: 'Subject' },
    { value: 'Mathmatics', display: 'Mathmatics' },
    { value: 'Biology', display: 'Biology' },
    { value: 'English', display: 'English' }
  ];

  grades = [
    { value: '', display: 'Grade' },
    { value: 'G1', display: 'Grade 1' },
    { value: 'G2', display: 'Grade 2' },
    { value: 'G3', display: 'Grade 3' }
  ];

  onSearch() { // Modified to only emit filters when button is clicked
    this.emitFilters();
  }

  onSubjectChange(event: any) {
    this.selectedSubject = event.target.value; // Still update selectedSubject
    // Do NOT emit filters here - only on button click
  }

  onGradeChange(event: any) {
    this.selectedGrade = event.target.value;     // Still update selectedGrade
    // Do NOT emit filters here - only on button click
  }

  emitFilters() {
    this.searchFilterChanged.emit({
      searchTerm: this.searchTerm.trim(),
      subject: this.selectedSubject,
      grade: this.selectedGrade
    });
  }
}