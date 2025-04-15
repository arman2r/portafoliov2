import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toggle-sidenav-btn',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './toggleSidenavBtn.component.html',
  styleUrl: './toggleSidenavBtn.component.css',
  standalone: true,
})
export class ToggleSidenavBtnComponent {
  @Output() toggleSidenavEvent: EventEmitter<boolean> = new EventEmitter(true);

  toggleSidenav() {
    this.toggleSidenavEvent.emit(!this.toggleSidenavEvent);
  }
}
