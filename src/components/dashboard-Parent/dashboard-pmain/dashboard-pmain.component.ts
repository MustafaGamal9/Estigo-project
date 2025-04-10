import { Component, Input } from '@angular/core';
import { MainPcontentComponent } from "../main-pcontent/main-pcontent.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-pmain',
  imports: [MainPcontentComponent,CommonModule],
  templateUrl: './dashboard-pmain.component.html',
  styleUrl: './dashboard-pmain.component.css'
})
export class DashboardPmainComponent {
  @Input() selectedComponent: 'Page1' | 'Page2' | 'Page3' | 'Page4' = 'Page1'; 
}
