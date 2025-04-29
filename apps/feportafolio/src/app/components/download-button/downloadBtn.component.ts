import { Component, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DownloadContentComponent } from '../download-bottom-sheet/downloadContent.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-download-btn',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './downloadBtn.component.html',
  styleUrl: './downloadBtn.component.scss',
})
export class DownloadBtnComponent {

  private _bottomSheet = inject(MatBottomSheet);
  private _snackBarMsg = inject(MatSnackBar);

  constructor(private ViewContainerRef: ViewContainerRef) { }

  openBoardDownloadFile() {

    this._bottomSheet.open(DownloadContentComponent, {
      viewContainerRef: this.ViewContainerRef,
    }).afterDismissed().subscribe({
      next: (result) => {
        console.log('Resultado del bottom sheet:', result);
        if (result === 'closed') {
          this._snackBarMsg.open('Gracias, estare antento a resolver tus dudas', 'cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
          console.log('gracias por descargar el archivo');
        } else {
          //console.log('No se ha registrado el like');
          console.log('no se descargo el archivo');
        }
      }
    });
  }

}
