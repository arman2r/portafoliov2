import { API_BASE_URL } from './../../Tokens/api-url.token';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from '../../Interfaces/skill.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillsService {

  private skillsUrl!: string; // Ajusta la ruta si es necesario

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiUrl: string) {
    console.log('API base URL:', this.apiUrl);
    console.log('API base URL directly from environment:', environment.apiUrl);
    console.log('Production mode:', environment.production);
  }

  getSkills(): Observable<ISkill[]> {
    const baseUrl = this.apiUrl || environment.apiUrl;
    this.skillsUrl = `${baseUrl}/assets/data-mock/skills.json`;
    return this.http.get<ISkill[]>(this.skillsUrl);
  }
}
