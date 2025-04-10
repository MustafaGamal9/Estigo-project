import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; 
import { FormsModule } from '@angular/forms';         
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-g-header-not-user',
  standalone: true,
  imports: [
    FormsModule,    
    RouterModule,  
    CommonModule
  ],
  templateUrl: './g-header-not-user.component.html',
  styleUrl: './g-header-not-user.component.css'
})
export class GHeaderNotUserComponent implements AfterViewInit {
  searchTerm: string = ''; 

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) {} 

  ngAfterViewInit() {
    // Get all nav links
    const navLinks = this.el.nativeElement.querySelectorAll('.nav-link');
    
    // Add click event to each nav link to close the navbar collapse
    navLinks.forEach((link: HTMLElement) => {
      this.renderer.listen(link, 'click', () => {
        // Get the navbar collapse element
        const navbarCollapse = document.getElementById('navbarNav');
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