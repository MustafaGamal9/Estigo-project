import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { GHeaderNotUserComponent } from '../../shared/g-header-not-user/g-header-not-user.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FooterComponent, GHeaderNotUserComponent, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements AfterViewInit {
  @ViewChild('roleDropdown', { static: false }) roleDropdownRef: ElementRef | undefined;
  @ViewChild('trackContainer', { static: false }) trackContainerRef: ElementRef | undefined;
  @ViewChild('subjectContainer', { static: false }) subjectContainerRef: ElementRef | undefined;

  selectedRole: string = '';
  formData: any = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    phone: '',
    track: '',
    subject: '',
    birthDate: '',
    level: 1,
    parentPhone: '',
    notes: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    if (this.roleDropdownRef) {
      this.roleDropdownRef.nativeElement.addEventListener('change', () => {
        this.updateVisibility();
      });
      this.updateVisibility();
    }
  }

  updateVisibility(): void {
    if (this.trackContainerRef && this.subjectContainerRef && this.roleDropdownRef) {
      const role = this.roleDropdownRef.nativeElement.value;
      if (role === 'student') {
        this.trackContainerRef.nativeElement.style.display = 'block';
        this.subjectContainerRef.nativeElement.style.display = 'none';
      } else if (role === 'teacher') {
        this.trackContainerRef.nativeElement.style.display = 'none';
        this.subjectContainerRef.nativeElement.style.display = 'block';
      } else { // Handles 'select' or any other value
        this.trackContainerRef.nativeElement.style.display = 'none';
        this.subjectContainerRef.nativeElement.style.display = 'none';
      }
    }
  }

  async onSubmit() {
    if (this.formData.password !== this.formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    let response;

    try {
      const requestData = {
        email: this.formData.email,
        password: this.formData.password,
        name: this.formData.name,
        gender: this.formData.gender,
        phone: this.formData.phone
      };

      switch (this.selectedRole) {
        case 'teacher':
          response = await this.authService.registerTeacher({
            ...requestData,
            Subject: this.formData.subject,
            notes: this.formData.notes
          }).toPromise();
          break;

        case 'student':
          response = await this.authService.registerStudent({
            ...requestData,
            birthDate: this.formData.birthDate,
            track: this.formData.track,
            level: this.formData.level,
            parentPhone: this.formData.parentPhone
          }).toPromise();
          break;

        case 'parent':
          response = await this.authService.registerParent({
            email: this.formData.email,
            password: this.formData.password,
            name: this.formData.name,
            gender: this.formData.gender
          }).toPromise();
          break;

        default:
          alert('Please select a valid role');
          return;
      }

      if (response) {
        this.router.navigate(['/login']);
      }
    } catch (error: any) {
      console.error('Registration failed:', error);
      const errorMessage = error.error?.message || error.message || 'Registration failed. Please try again.';
      alert(`Registration failed: ${errorMessage}`);
    }
  }
}