import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, QueryList, signal, ViewChildren } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { ISkill, SkillsService } from '@portafolio/shared-data'; // reemplaza "myorg" por tu scope Nx

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, MatDividerModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent implements AfterViewInit, OnDestroy {

  skills = signal<ISkill[]>([]);
  @ViewChildren('skillItem') skillElements!: QueryList<ElementRef>;
  private observer!: IntersectionObserver;

  constructor(private skillsService: SkillsService, private ref: ChangeDetectorRef, @Inject(PLATFORM_ID) private platformId: object) { }

  ngAfterViewInit() {
   //console.log('entro aqui una vez')
    
    this.skillsService.getSkills().subscribe(data => {
      this.skills.set(data); // Asignar los datos recibidos a la señal data;

      // Esperar a que Angular renderice los elementos en la vista
      setTimeout(() => {        
        this.setupObserver();
      }, 100);
    });
 

    // Escuchar cambios en los elementos del DOM (por hot reload)
    this.skillElements.changes.subscribe(() => {
      //console.log('esta escuchando cambios en los elementos del DOM');
      this.setupObserver(); // Reiniciar observer cuando se actualicen los elementos
    });
  }


  setupObserver() {

    if (!isPlatformBrowser(this.platformId)) return;

    if (this.observer) {
      this.observer.disconnect(); // Desconectar antes de crear uno nuevo
    }

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0.5) {
          entry.target.classList.add('visible');
        } else if (entry.intersectionRatio < 0.2) {
          entry.target.classList.remove('visible');
        }
      });
    }, { threshold: [0.2, 0.8], rootMargin: '0px 0px -10% 0px' });

    requestAnimationFrame(() => {
      this.skillElements.forEach(skill => {
        this.observer.observe(skill.nativeElement);
      });
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

}
