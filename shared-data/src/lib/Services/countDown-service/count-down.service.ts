import { Injectable } from '@angular/core';
import { interval, map, Observable, Subject, takeWhile } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountDownService {

  private countdownSubject = new Subject<{ minutes: number, seconds: number, finished: boolean }>();
  private isRunning = false;
  private totalSeconds = 0;

  /**
   * Inicia el contador con la cantidad especificada de minutos
   * @param minutes Cantidad de minutos para el contador
   */
  startCountdown(minutes: number): void {
    if (this.isRunning) {
      console.warn('El contador ya está en ejecución');
      return;
    }

    this.isRunning = true;
    this.totalSeconds = minutes * 60;

    const countdown$ = interval(1000).pipe(
      takeWhile(() => this.totalSeconds > 0),
      map(() => {
        this.totalSeconds--;

        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;
        const finished = this.totalSeconds <= 0;

        if (finished) {
          this.isRunning = false;
        }

        return { minutes, seconds, finished };
      })
    );

    countdown$.subscribe({
      next: (value) => this.countdownSubject.next(value),
      complete: () => this.countdownSubject.next({ minutes: 0, seconds: 0, finished: true })
    });
  }

  /**
   * Obtiene un observable del contador
   * @returns Observable que emite el estado actual del contador
   */
  getCountdown(): Observable<{ minutes: number, seconds: number, finished: boolean }> {
    return this.countdownSubject.asObservable();
  }

  /**
   * Detiene el contador manualmente
   */
  stopCountdown(): void {
    this.isRunning = false;
    this.totalSeconds = 0;
    this.countdownSubject.next({ minutes: 0, seconds: 0, finished: true });
  }
}
