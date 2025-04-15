import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetOverviewSharedComponent } from '../bottom-sheet-shared/bottom-sheet-overview-shared.component';

@Component({
  standalone: true,
  selector: 'app-shared-btn',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './sharedBtn.component.html',
  styleUrl: './sharedBtn.component.css',
})
export class SharedBtnComponent {
  private _bottomSheet = inject(MatBottomSheet);

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewSharedComponent);    
  }
}
