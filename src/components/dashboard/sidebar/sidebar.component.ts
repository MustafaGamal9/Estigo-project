import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true
})
export class SidebarComponent {
  @Output() componentChange = new EventEmitter<string>();

  onLinkClicked(componentName: string) {
    this.componentChange.emit(componentName);
  }
}