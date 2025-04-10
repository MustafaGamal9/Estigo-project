import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private isBrowser: boolean;

  constructor(
    private authService: AuthService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  canActivate(): boolean | Observable<boolean> {
    // Check if we're in a browser environment before accessing localStorage
    if (this.isBrowser) {
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      
      if (isAuthenticated) {
        return true;
      } else {
        this.router.navigate(['/login'], { skipLocationChange: false, replaceUrl: true });
        return false;
      }
    }
    
    // For server-side rendering, default to not authenticated
    return false;
  }
}
