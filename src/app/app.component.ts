import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



// Path of the page: src/app/app.component.ts

@Component({
  selector: 'app-root',
  standalone: true, // Make sure standalone is true
  imports: [
    RouterOutlet,
    CommonModule,

],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'estigo-academy-homepage';
}