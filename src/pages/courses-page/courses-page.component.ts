import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesListComponent } from '../../components/courses/courses-list/courses-list.component';
import { WHeaderProfileComponent } from "../../shared/w-header-profile/w-header-profile.component";
import { FooterComponent } from '../../shared/footer/footer.component';
import { CoursesSearchSectionComponent } from '../../components/courses/search-section/search-section.component';


@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [CommonModule, CoursesListComponent, FooterComponent, WHeaderProfileComponent,CoursesSearchSectionComponent],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {

}