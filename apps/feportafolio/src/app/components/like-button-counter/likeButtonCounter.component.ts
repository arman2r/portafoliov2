import { Component, Output, EventEmitter, Input, inject, PLATFORM_ID, Inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { RegisterSubscriberComponent } from '../register-subscriber/registerSubscriber.component';
import { AuthService, LikesService } from '@portafolio/shared-data';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-like-button-counter',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatBadgeModule, MatBottomSheetModule],
  templateUrl: './likeButtonCounter.component.html',
  styleUrl: './likeButtonCounter.component.css',
  standalone: true,
})
export class LikeButtonCounterComponent {

  private _bottomSheet = inject(MatBottomSheet);
  private _snackBarMsg = inject(MatSnackBar);
  @Input() counter = 0;
  @Output() likeEvent = new EventEmitter<number>();  


  constructor(private auth: AuthService, private likeSrvice: LikesService, private viewContainerRef: ViewContainerRef) {}

  like(event: MouseEvent) {
    (event.target as HTMLElement).blur();
    this.openRegisterSubscriber();
    /*this.likeEvent.emit(1);
    this.counter++;*/
  }

  async openRegisterSubscriber() {
    const isAuthenticated = await this.auth.isAuthenticated();
    if (!isAuthenticated) {
      this._bottomSheet.open(RegisterSubscriberComponent, {
        viewContainerRef: this.viewContainerRef,
      }).afterDismissed().subscribe({
        next: (result) => {
          console.log('Resultado del bottom sheet:', result);
          if (result) {
            this.setLikeToCount();
            this.counter++;
            this.likeEvent.emit(this.counter);
          } else {
            console.log('No se ha registrado el like');
          }
        }
      });
    } else {
      this.setLikeToCount();
      this.counter++;
      this.likeEvent.emit(this.counter);
    }
  }

  getFragment(): string | null {
    const parsedUrl = new URL(window.location.href); 
    //console.log(baseUrl);    
    const fragmentUrl = parsedUrl.hash ? parsedUrl.pathname + parsedUrl.hash : parsedUrl.pathname;
    
    return fragmentUrl;
  }


  setLikeToCount() {
    const fragmentUrl = this.getFragment() as string;
    console.log('Fragmento de URL:', fragmentUrl);
    this.likeSrvice.createLike(fragmentUrl).subscribe({
      next: (result) => {
        if (result) {
          console.log('Operación completada:', result);
          // Aquí puedes mostrar un mensaje de éxito al usuario
        }
      },
      error: (error) => {
        console.error('Error en el proceso:', error);
        this.counter--;
        this.likeEvent.emit(this.counter);
        this._snackBarMsg.open('Gracias, ya diste like a esta sección', '🥳', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    });
  }

}
