import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-bottom-sheet-overview-shared',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './bottom-sheet-overview-shared.component.html',
  styleUrl: './bottom-sheet-overview-shared.component.css',
  standalone: true
})
export class BottomSheetOverviewSharedComponent {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewSharedComponent>>(MatBottomSheetRef);
  private _snackBar = inject(MatSnackBar);
  linkCopy = false;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) { }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  compartirEnFacebook(): void {
    if (isPlatformBrowser(this.platformId)) {
      const urlActual = 'https://ingrubio.com/';
      const urlEncoded = encodeURIComponent(urlActual);
      const urlFacebook = `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}`;

      window.open(
        urlFacebook,
        'popup',
        'width=600,height=500,scrollbars=no,resizable=no'
      );
    }
  }

  compartirEnTwitter(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent("Ingrubio.com, software developer, frontend sr y fullstack ssr");
      const twitterUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      window.open(twitterUrl, 'popup', 'width=600,height=500');
    }
  }

  compartirEnWhatsApp(): void {
    if (isPlatformBrowser(this.platformId)) {
      const url = encodeURIComponent(window.location.href);
      const mensaje = encodeURIComponent("Ingrubio.com, software developer, frontend sr y fullstack ssr");
      const whatsappUrl = `https://wa.me/?text=${mensaje}%20${url}`;
      window.open(whatsappUrl, '_blank');
    }
  }

  irAInstagram(): void {
    window.open('https://www.instagram.com/arman_2_r', '_blank');
  }

  copiarEnlace(): void {
    if (isPlatformBrowser(this.platformId)) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        this.openSnackBar('Enlace copiado al portapapeles', 'Cerrar');
        this.linkCopy = true;
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: 3000
    });
  }

}
