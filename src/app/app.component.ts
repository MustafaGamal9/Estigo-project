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

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [
    RouterOutlet,
    CommonModule,
    WHeaderNotUserComponent,
    WHeaderProfileComponent,
    FooterComponent,
    GHeaderNotUserComponent,
    GHeaderProfileComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estigo-academy-homepage';
  currentHeaderType: string = 'default'; 
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) { 
     
      this.router.events.subscribe((event) => { 
          if (event instanceof NavigationEnd) { 
              this.updateHeaderForRoute(event.url);
          }
      });
      this.updateHeaderForRoute(this.router.url);
      
      
      this.authService.isAuthenticated$.subscribe(isAuthenticated => {
          this.isAuthenticated = isAuthenticated;
      });
  }

  updateHeaderForRoute(url: string): void {
      if (url.includes('/courses')) { 
          this.currentHeaderType = 'white';

      } else {
          this.currentHeaderType = 'green'; 
      }
  }
}