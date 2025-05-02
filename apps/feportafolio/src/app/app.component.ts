/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, effect, EnvironmentInjector, inject, OnDestroy, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { delay, filter } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ToggleSidenavBtnComponent } from "./components/toggle-sidenav-btn/toggleSidenavBtn.component";
import { LikeButtonCounterComponent } from "./components/like-button-counter/likeButtonCounter.component";
import { MatIconModule } from '@angular/material/icon';
import { SharedBtnComponent } from "./components/shared-btn/sharedBtn.component";
import { FooterComponent } from './components/footer/footer.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { LikesService, LoadingService } from '@portafolio/shared-data';
import { ILikes } from '@portafolio/shared-data'; 
import { DownloadBtnComponent } from './components/download-button/downloadBtn.component';
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
    FooterComponent,
    DownloadBtnComponent
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {

  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  title = inject(Title);
  showFiller = true;

  likeHover = false;
  @ViewChild('menuPlaceHolder', { read: ViewContainerRef })
  menuViewContainer!: ViewContainerRef;
  @ViewChild('drawer') drawer!: MatDrawer;

  protected readonly isMobile = signal(true);

  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;
  componentMenuRef!: any;
  getLikeCounter = signal(0);
  loading = false;

  constructor(private _loading: LoadingService, private router: Router, private likeService: LikesService, private meta: Meta, @Inject(PLATFORM_ID) private platformId: object) {
    effect(() => {
      if (this.isMobile()) {
        this.drawer?.close();
      } else {
        this.drawer?.open();
      }
    }, { injector: inject(EnvironmentInjector) });
    
    if (isPlatformBrowser(this.platformId)) {
      const media = inject(MediaMatcher);
      this._mobileQuery = media.matchMedia('(max-width: 1023.9px)');
      this.isMobile.set(this._mobileQuery.matches);
      this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
      this._mobileQuery.addEventListener('change', this._mobileQueryListener);
    } else {
      // Fallback para servidor
      this._mobileQuery = {
        matches: false,
        addEventListener: () => { },
        removeEventListener: () => { },
      } as any;
      this._mobileQueryListener = () => { };
    }
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

    if (this.isBrowser) {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => {
          //console.log('NavigationEnd event triggered', this.router);
          const tree = this.router.parseUrl(this.router.url);
          if (tree.fragment) {
            //console.log(tree.fragment.length);
            const checkAndScroll = () => {
              const element = document.querySelector('#' + tree.fragment);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                // Si el elemento aún no existe, intenta de nuevo en un momento
                setTimeout(checkAndScroll, 100);
              }
            };
            checkAndScroll();
          }
        });
      this.setLike();
    }

    this.listenToLoading();
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
        //console.log('Loading status:', this.loading);
      });
  }

  async loadRemotes(): Promise<void> {
    const ms = await import('sidenavmenu/MenuComponent');
    this.componentMenuRef = this.menuViewContainer.createComponent(ms.MenuComponent);
    if (this.isMobile()) {
      (this.componentMenuRef.instance as any).menuClicked.subscribe(() => {
        this.drawer.close();
      });
    }
  }


  setLike() {
    this.likeService.getLikes().subscribe((likes: ILikes[]) => {
      //console.log('Likes:', likes);
      const countLikes = Array.isArray(likes) ? likes.length : 0;
      //console.log('Cantidad de likes:', countLikes);
      this.getLikeCounter.set(countLikes);
    });
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
    }
  }
}
