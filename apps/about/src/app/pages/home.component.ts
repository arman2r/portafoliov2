import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PresentationComponent } from './presentation/presentation.component';
import { SkillsComponent } from './skills/skills.component';
import { ExperienceComponent } from './experience/experience.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PresentationComponent, SkillsComponent, ExperienceComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
