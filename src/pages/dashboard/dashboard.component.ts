import { Component } from '@angular/core';
import { SidebarComponent } from "../../components/dashboard/sidebar/sidebar.component";
import { DashboardMainComponent } from '../../components/dashboard/dashboard-main/dashboard-main.component';
import { CommonModule, NgIf } from '@angular/common';
import { SidebarTeacherComponent } from "../../components/dashboard-Teacher/sidebar-teacher/sidebar-teacher.component";
import { DashboardTmainComponent } from "../../components/dashboard-Teacher/dashboard-tmain/dashboard-tmain.component";
import { SidebarAdminComponent } from "../../components/dashboard-Admin/sidebar-admin/sidebar-admin.component";
import { DashboardAmainComponent } from "../../components/dashboard-Admin/dashboard-amain/dashboard-amain.component";
import { SidebarParentComponent } from "../../components/dashboard-Parent/sidebar-parent/sidebar-parent.component";
import { DashboardPmainComponent } from "../../components/dashboard-Parent/dashboard-pmain/dashboard-pmain.component";

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent, DashboardMainComponent, NgIf, CommonModule, SidebarTeacherComponent, DashboardTmainComponent, SidebarAdminComponent, DashboardAmainComponent, SidebarParentComponent, DashboardPmainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {
  selectedComponentName: 'Page1' | 'Page2' | 'Page3' | 'Page4' = 'Page1';
  private userTypeFromStorage = JSON.parse(localStorage.getItem('userData') || '{}').role as 'Student' | 'Teacher' | 'Admin' | 'Parent' || 'Student';
  UserType: 'Student' | 'Teacher' | 'Admin' | 'Parent' = this.userTypeFromStorage;

  constructor() {
    console.log(this.UserType);
  }

  onComponentChange(componentName: string) {
    this.selectedComponentName = componentName as  'Page1' | 'Page2' | 'Page3' | 'Page4';
  }
}