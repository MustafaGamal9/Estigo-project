import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { GHeaderNotUserComponent } from '../../shared/g-header-not-user/g-header-not-user.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, GHeaderNotUserComponent, FormsModule,RouterLink], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('roleDropdown', { static: false }) roleDropdownRef: ElementRef | undefined;
  @ViewChild('trackContainer', { static: false }) trackContainerRef: ElementRef | undefined;
  @ViewChild('subjectContainer', { static: false }) subjectContainerRef: ElementRef | undefined;
  @ViewChild('parentCodeContainer', { static: false }) parentCodeContainerRef: ElementRef | undefined;

  selectedRole: string = ''; 

  constructor() { }

  ngAfterViewInit(): void {
    if (this.roleDropdownRef) {
      this.roleDropdownRef.nativeElement.addEventListener('change', () => {
        this.updateVisibility();
      });
    }
  }

  updateVisibility(): void {
    if (this.trackContainerRef && this.subjectContainerRef && this.roleDropdownRef && this.parentCodeContainerRef) {
      const role = this.roleDropdownRef.nativeElement.value;
      if (role === 'student') {
        this.trackContainerRef.nativeElement.style.display = 'block';
        this.subjectContainerRef.nativeElement.style.display = 'none';
        this.parentCodeContainerRef.nativeElement.style.display = 'none';
      } else if (role === 'teacher') {
        this.trackContainerRef.nativeElement.style.display = 'none';
        this.subjectContainerRef.nativeElement.style.display = 'block';
        this.parentCodeContainerRef.nativeElement.style.display = 'none';
      } else if (role === 'parent') {
        this.trackContainerRef.nativeElement.style.display = 'none';
        this.subjectContainerRef.nativeElement.style.display = 'none';
        this.parentCodeContainerRef.nativeElement.style.display = 'block';
      } else { // Handles 'select' or any other value
        this.trackContainerRef.nativeElement.style.display = 'none';
        this.subjectContainerRef.nativeElement.style.display = 'none';
        this.parentCodeContainerRef.nativeElement.style.display = 'none';
      }
    }
  }
}