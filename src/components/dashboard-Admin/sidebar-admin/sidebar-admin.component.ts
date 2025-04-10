import { Component, Output, EventEmitter, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sidebar-admin',
  imports: [NgIf, NgClass],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.css',
  standalone: true
})
export class SidebarAdminComponent {
  @Output() componentChange = new EventEmitter<string>();
  isMobileView = false;
  isSidebarOpen = false;
  screenWidth: number = 1024;
  isInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      // Delay setting isInitialized to true to prevent flash
      setTimeout(() => {
        this.isInitialized = true;
      }, 0);
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.screenWidth = window.innerWidth;
      this.isMobileView = this.screenWidth <= 768;
      if (!this.isInitialized) {
        this.isSidebarOpen = false;
      } else {
        this.isSidebarOpen = !this.isMobileView;
      }
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onLinkClicked(componentName: string) {
    this.componentChange.emit(componentName);
    if (this.isMobileView) {
      this.isSidebarOpen = false;
    }
  }
}