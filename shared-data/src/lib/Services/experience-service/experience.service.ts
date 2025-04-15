import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IExperience } from '../../Interfaces/experience.interface';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private experienceUrl = 'assets/data-mock/experience.json';

  constructor(private http: HttpClient) { }

  getExperiences(): Observable<IExperience[]> {
    return this.http.get<IExperience[]>(this.experienceUrl).pipe(
      catchError((error) => {
        console.error('Error loading experiences', error);
        return of([]); // Retorna array vacío en caso de error
      })
    );
  }
}
