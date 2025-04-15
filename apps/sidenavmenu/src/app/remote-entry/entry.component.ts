import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../components/menu.component';

@Component({
  imports: [CommonModule, MenuComponent],
  selector: 'app-sidenavmenu-entry',
  standalone: true,
  template: `<app-menu></app-menu>`,
})
export class RemoteEntryComponent {}
