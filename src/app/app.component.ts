import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GHeaderProfileComponent } from '../shared/g-header-profile/g-header-profile.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,GHeaderProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Estigo-project';
}
