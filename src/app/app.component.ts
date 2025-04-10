import { GHeaderNotUserComponent } from './../shared/g-header-not-user/g-header-not-user.component';
import { GHeaderProfileComponent } from './../shared/g-header-profile/g-header-profile.component';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FooterComponent } from "../shared/footer/footer.component";
import { Router, NavigationEnd } from '@angular/router';
import { ChatbotIconComponent } from "../shared/chatbot-icon/chatbot-icon.component";
import { AuthService } from '../services/auth.service';

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
export class AppComponent implements OnInit {
  title = 'Estigo';
  isHomePage: boolean = false;
  isAuthenticated: boolean = false;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router, private authService: AuthService) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // so the chatbot is only in home page ( mmkn nsebo fe elba2y msh 3aref)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/';
      }
    });
  }

  ngOnInit() {
    if (this.isBrowser) {
      this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    }
  
    
    // send the changes to auth service
    this.authService.isAuthenticated$.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
    
  }
}