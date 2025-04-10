import { Component } from '@angular/core';
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
export class GHeaderNotUserComponent {
  searchTerm: string = ''; 

  constructor(private router: Router) {} 

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