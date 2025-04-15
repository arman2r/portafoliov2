import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from "../pages/home.component";

@Component({
  standalone: true,
  imports: [CommonModule, HomeComponent],
  selector: 'app-about-entry',
  template: `<app-home></app-home>`,
})
export class RemoteEntryComponent {}
