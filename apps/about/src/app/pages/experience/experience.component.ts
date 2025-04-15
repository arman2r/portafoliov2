import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { IExperience, ExperienceService } from '@portafolio/shared-data';
@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDividerModule, MatIconModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  private experienceService = inject(ExperienceService);
  experiences = signal<IExperience[]>([]);
  readMoreTxt = signal<any>(null); // null indica que no hay elemento seleccionado  
  patternElement = viewChild<ElementRef>('patternElementScroll');

  constructor() {
    this.experienceService.getExperiences().subscribe(data => {
      this.experiences.set(data);
    });
  }

  readMore(index: number | null) {
    if (index === this.readMoreTxt()) {
      this.readMoreTxt.set(null); // Si ya está abierto, cerrarlo
    } else {
      this.readMoreTxt.set(index); // Abrir el nuevo elemento
    }

  }

  nextItem() {
    //console.log(this.patternElement()?.nativeElement);
    const element = this.patternElement()?.nativeElement;
    if (!element) return;
    console.log('element', element);
    const scrollAmount = window.innerWidth < 768 ? window.innerWidth : 280;
    element.scrollBy({ left: scrollAmount + 10, behavior: 'smooth' });
  }

  leftItem() {
    //console.log(this.patternElement()?.nativeElement);
    const element = this.patternElement()?.nativeElement;
    if (!element) return;

    const scrollAmount = window.innerWidth < 768 ? window.innerWidth : 280;
    element.scrollBy({ left: -scrollAmount - 10, behavior: 'smooth' });
  }

}
