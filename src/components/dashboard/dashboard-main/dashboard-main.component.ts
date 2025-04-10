import { Component, Input } from '@angular/core';
import { MainContentComponent } from '../main-content/main-content.component';
import { MyCoursesComponent } from '../my-courses/my-courses.component';
import { NgIf } from '@angular/common';
import { PaymentInfoComponent } from "../payment-info/payment-info.component";
import { QuizziesComponent } from "../quizzies/quizzies.component";

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [MainContentComponent, MyCoursesComponent, NgIf, PaymentInfoComponent, QuizziesComponent],
  templateUrl: './dashboard-main.component.html',
  styleUrl: './dashboard-main.component.css'
})
export class DashboardMainComponent {
  @Input() selectedComponent: 'Page1' | 'Page2' | 'Page3' | 'Page4' = 'Page1'; // default is main content
}