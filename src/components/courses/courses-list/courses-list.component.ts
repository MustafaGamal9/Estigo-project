import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MathComponent } from "../math/math.component";
import { EnglishComponent } from "../english/english.component";
import { BiologyComponent } from "../biology/biology.component";
import { PhysicsComponent } from "../physics/physics.component";
import { ChemistryComponent } from "../chemistry/chemistry.component";


@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule, MathComponent, EnglishComponent, BiologyComponent, PhysicsComponent, ChemistryComponent],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']

})
export class CoursesListComponent {

}