import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DownloadService } from '@portafolio/shared-data';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
@Component({
  selector: 'app-download-content',
  imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule, MatProgressBarModule],
  templateUrl: './downloadContent.component.html',
  styleUrl: './downloadContent.component.scss',
})
export class DownloadContentComponent {

  isLoading = false;

  constructor(private cvDownloadService: DownloadService, private _bottomSheetRef: MatBottomSheetRef<DownloadContentComponent>,) { }

  downloadCV(type: 'frontend' | 'fullstack') {
    this.isLoading = true;
    this.cvDownloadService.downloadFile(type)
      .finally(() => {
        this.isLoading = false;
        this._bottomSheetRef.dismiss('closed');
      });
  }

}
