import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
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
export class GHeaderProfileComponent implements AfterViewInit {
  searchTerm: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    // Get all nav links
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-link, .dropdown-item');
    
    // Add click event to each nav link to close the navbar collapse
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => {
        // Get the navbar collapse element
        const navbarCollapse = document.getElementById('navbarNavProfile');
        // Check if the navbar is expanded (has show class)
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          // Find the navbar toggler button and click it to collapse the navbar
          const navbarToggler = document.querySelector('.navbar-toggler') as HTMLElement;
          if (navbarToggler) {
            navbarToggler.click();
          }
        }
      });
    });
  }

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