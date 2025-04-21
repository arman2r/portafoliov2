import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-sidenavmenu-entry',
  standalone: true,
  template: `<router-outlet></router-outlet>`,
})
export class RemoteEntryComponent {
  constructor() {
    console.log('RemoteEntryComponent loaded');
  }
}
