import { MatDrawer } from '@angular/material/sidenav';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {

  activeFragment?: string | null = null;;
  private sectionIds = ['presentacion', 'skills', 'experiencia', 'contactar']; 

  private scrollListener = this.onScroll.bind(this);
  @Output() menuClicked = new EventEmitter<void>();

  constructor(public route: ActivatedRoute, private router: Router, @Inject(DOCUMENT) private document: Document) {
    //console.log('location', this.activeFragment.location);
  }

  ngOnInit() {
    // Escuchar cambios en el fragmento de la URL
    this.route.fragment.subscribe(fragment => {
      this.activeFragment = fragment;
    });

    // También escuchar eventos de navegación para detectar cambios
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const tree = this.router.parseUrl(this.router.url);
        this.activeFragment = tree.fragment;
      });
  }

  ngAfterViewInit(): void {
    //console.log('document', this.document.querySelector('.mat-drawer-content'));
    const scrollPattern = this.document.querySelector('.mat-drawer-content');
    scrollPattern?.addEventListener('scroll', this.scrollListener, true);
  }

  ngOnDestroy(): void {
    //window.removeEventListener('scroll', this.scrollListener, true);
    const scrollPattern = this.document.querySelector('.mat-drawer-content');
    scrollPattern?.removeEventListener('scroll', this.scrollListener, true);
  }

  onScroll(): void {
    const scrollPattern = this.document.querySelector('.mat-drawer-content') as HTMLElement;
    const scrollPosition = scrollPattern?.scrollTop || 0;

    // Si el scroll está arriba, activamos directamente "presentacion"
    if (scrollPosition <= 10) {
      this.activeFragment = 'presentacion';
      return;
    }

    let closestSection: string | null = null;
    let minDistance = Number.POSITIVE_INFINITY;

    this.sectionIds.forEach(id => {
      const el = this.document.getElementById(id);
      if (el) {
        const distance = Math.abs(el.offsetTop - scrollPosition);
        if (distance <= minDistance) {
          minDistance = distance;
          closestSection = id;
        }
      }
    });

    if (closestSection !== this.activeFragment) {
      this.activeFragment = closestSection;
    }
  }

  isActive(fragment: string): boolean {
    //console.log('fragment', this.activeFragment, fragment);
    return this.activeFragment === fragment;
  }

  onCloseMenu(): void {
    this.menuClicked.emit();
  }

}
