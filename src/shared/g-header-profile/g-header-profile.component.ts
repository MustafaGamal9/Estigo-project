import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-g-header-profile',
  imports: [CommonModule, RouterLink],
  standalone: true,
  templateUrl: './g-header-profile.component.html',
  styleUrl: './g-header-profile.component.css'
})
export class GHeaderProfileComponent {

}
