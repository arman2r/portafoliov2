import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-like-button-counter',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './likeButtonCounter.component.html',
  styleUrl: './likeButtonCounter.component.css',
  standalone: true,
})
export class LikeButtonCounterComponent {}
