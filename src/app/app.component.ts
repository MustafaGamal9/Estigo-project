import { GHeaderNotUserComponent } from './../shared/g-header-not-user/g-header-not-user.component';
import { GHeaderProfileComponent } from './../shared/g-header-profile/g-header-profile.component';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WHeaderNotUserComponent } from "../shared/w-header-not-user/w-header-not-user.component";
import { WHeaderProfileComponent } from "../shared/w-header-profile/w-header-profile.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { Router, NavigationEnd } from '@angular/router'; 
import { AuthService } from '../services/auth.service';
import { ChatbotIconComponent } from "../shared/chatbot-icon/chatbot-icon.component";
import { CourseVideoComponent } from "../pages/course-video/course-video.component";


@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    CommonModule,
    FooterComponent,
    GHeaderNotUserComponent,
    GHeaderProfileComponent,
    ChatbotIconComponent,
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Estigo';
  isAuthenticated: boolean = false;
  isHomePage: boolean = false; // Add a property to track if it's the home page

  constructor(private router: Router, private authService: AuthService) { 
      this.authService.isAuthenticated$.subscribe(isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
      });

      // Subscribe to router events to check if the current route is the home page
      this.router.events.subscribe(event => {
          if (event instanceof NavigationEnd) {
              this.isHomePage = this.router.url === '/'; // Adjust the condition based on your home page route
          }
      });
  }
}
