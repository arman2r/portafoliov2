import { Component, inject, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { filter } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToggleSidenavBtnComponent } from "./components/toggle-sidenav-btn/toggleSidenavBtn.component";
import { LikeButtonCounterComponent } from "./components/like-button-counter/likeButtonCounter.component";
import { MatIconModule } from '@angular/material/icon';
import { SharedBtnComponent } from "./components/shared-btn/sharedBtn.component";
import { FooterComponent } from './components/footer/footer.component';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    ToggleSidenavBtnComponent,
    LikeButtonCounterComponent,
    SharedBtnComponent,
    FooterComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  title = inject(Title);
  showFiller = true;

  likeHover = false;
  @ViewChild('menuPlaceHolder', { read: ViewContainerRef })
  menuViewContainer!: ViewContainerRef;

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor(private router: Router, private meta: Meta) {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit() {
    this.loadRemotes();
    this.title.setTitle('Armando Rubio, Desarrollador Frontend Sr & Fullstack SSr');
    this.meta.addTags([
      { property: 'og:title', content: 'Armando Rubio, Desarrollador Frontend Sr & Fullstack SSr' },
      { property: 'og:description', content: 'Portafolio de trabajo donde expongo mis habilidades y experiencia en el desarrollo de software.' },
      { property: 'og:image', content: 'assets/portafolio-web.png' },
      { property: 'og:url', content: 'https://ingrubio.com' },
      { property: 'og:type', content: 'website' }
    ]);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        //console.log('NavigationEnd event triggered', this.router);
        const tree = this.router.parseUrl(this.router.url);
        if (tree.fragment) {
          //console.log(tree.fragment.length);
          const element = document.querySelector('#' + tree.fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
  }

  async loadRemotes(): Promise<void> {
    const ms = await import('sidenavmenu/MenuComponent');
    this.menuViewContainer.createComponent(ms.MenuComponent);
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
