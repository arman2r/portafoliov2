import { API_BASE_URL } from './../../Tokens/api-url.token';
import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from '../../Interfaces/skill.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skillsUrl!: string; // Ajusta la ruta si es necesario

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiUrl: string) {   
    console.log('API base URL:', this.apiUrl);  
  }

  getSkills(): Observable<ISkill[]> {
    this.skillsUrl = `${this.apiUrl}/assets/data-mock/skills.json`;
    return this.http.get<ISkill[]>(this.skillsUrl);
  }
}
