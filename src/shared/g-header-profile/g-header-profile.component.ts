import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';        
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-g-header-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule 
  ],
  templateUrl: './g-header-profile.component.html',
  styleUrls: ['./g-header-profile.component.css'] 
})
export class GHeaderProfileComponent {
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  onLogout() {
    this.authService.logout(); 
    this.router.navigate(['/']); 
    console.log('User logged out');
  }

  
  onSearch(): void {
    const termToSearch = this.searchTerm.trim();
    if (termToSearch) {
      console.log('Navigating to search results for:', termToSearch);
    
      this.router.navigate(['/course-s', termToSearch]);

    } else {
      console.log('Search term is empty, not navigating.');

    }
  }
}