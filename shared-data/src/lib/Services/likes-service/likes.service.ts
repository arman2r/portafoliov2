/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../Tokens/api-url.token';
import { ILikes } from '../../Interfaces/ILikes.interface';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
 
  constructor(private http: HttpClient, private authService: AuthService, @Inject(API_BASE_URL) private apiUrl: string) {}

  getLikes(): Observable<ILikes[]> {
    return this.http.get<ILikes[]>(`${this.apiUrl}/likes`);
  }

  createLike(urlSection: string) {
    const subscriberId = this.authService.getSubscriberId(); 
    return this.http.post(`${this.apiUrl}/likes`, { "subscriberId": subscriberId, "urlSection": urlSection });
  }
}
