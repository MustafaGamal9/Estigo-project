import { Component } from '@angular/core';
import { GHeaderProfileComponent } from "../../shared/g-header-profile/g-header-profile.component";
import { SidebarComponent } from "../../components/dashboard/sidebar/sidebar.component";
import { MainContentComponent } from "../../components/dashboard/main-content/main-content.component";
import { DashboardMainComponent } from '../../components/dashboard/dashboard-main/dashboard-main.component';


@Component({
  selector: 'app-dashboard',
  imports: [GHeaderProfileComponent, SidebarComponent, DashboardMainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {
  selectedComponentName: 'default' | 'my-courses' | 'quizzes' | 'payment-info' = 'default';

  onComponentChange(componentName: string) {
    this.selectedComponentName = componentName as  'default' | 'my-courses' | 'quizzes' | 'payment-info';
  }
}