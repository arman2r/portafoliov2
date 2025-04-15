import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISkill } from '../../Interfaces/skill.interface';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skillsUrl = 'assets/data-mock/skills.json'; // Ajusta la ruta si es necesario

  constructor(private http: HttpClient) { }

  getSkills(): Observable<ISkill[]> {
    return this.http.get<ISkill[]>(this.skillsUrl);
  }
}
