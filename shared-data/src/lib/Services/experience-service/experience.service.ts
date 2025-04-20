import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IExperience } from '../../Interfaces/experience.interface';
import { catchError, Observable, of } from 'rxjs';
import { API_BASE_URL } from '../../Tokens/api-url.token';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {

  private experienceUrl!: string; // Ajusta la ruta si es necesario

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiUrl: string) {     
  }


  getExperiences(): Observable<IExperience[]> {
    this.experienceUrl = `${this.apiUrl}/assets/data-mock/experience.json`;
    return this.http.get<IExperience[]>(this.experienceUrl).pipe(
      catchError((error) => {
        console.error('Error loading experiences', error);
        return of([]); // Retorna array vacío en caso de error
      })
    );
  }
}
