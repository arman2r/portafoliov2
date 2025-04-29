import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API_BASE_URL } from '../../Tokens/api-url.token';
import { catchError, map, Observable, of } from 'rxjs';
import { IsSubscriber, ISubscriber } from '../../Interfaces/ISubscriber.interface';
import { IAuth } from '../../Interfaces/IAuth.interface';



@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiUrl: string) { }

  getSubscriber(email: string): Observable<IsSubscriber> {
    return this.http.get<IsSubscriber>(`${this.apiUrl}/followers/${email}`);
  }

  setSubscriber(email: string): Observable<ISubscriber> {
    return this.http.post<ISubscriber>(`${this.apiUrl}/followers`, { email });
  }

  confirmSubscriber(email: string, code: string): Observable<IAuth | null> {
    return this.http.post<IAuth>(`${this.apiUrl}/code-verify/verify-and-login`, { email, code }).pipe(
      map((response: any) => {
        localStorage.setItem('auth_token_ingrubio', response.access_token);
        return response;
      }),
      catchError((error) => {
        console.error('Error al confirmar el suscriptor:', error);
        return of(null); // Manejo de error, puedes lanzar un error o devolver un valor por defecto
      })
    );
  }

  followerLogin(email: string): Observable<IAuth | null> {
    return this.http.post<IAuth>(`${this.apiUrl}/followers/follower-login`, { email }).pipe(
      map((response: any) => {
        localStorage.setItem('auth_token_ingrubio', response.access_token);
        return response;
      }),
      catchError((error) => {
        console.error('Error al confirmar el suscriptor:', error);
        return of(null); // Manejo de error, puedes lanzar un error o devolver un valor por defecto
      })
    );
  }


}
