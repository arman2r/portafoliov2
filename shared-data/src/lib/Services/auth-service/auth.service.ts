/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuth } from '../../Interfaces/IAuth.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  constructor() {
    // Verificar token al iniciar el servicio
    this.checkToken();
  }

  // Almacena el token en el localStorage
  setToken(token: string): void {
    localStorage.setItem('auth_token_ingrubio', token);
  }

  // Obtiene el token almacenado
  getToken(): string | null {
    return localStorage.getItem('auth_token_ingrubio');
  }

  // Elimina el token (logout)
  removeToken(): void {
    localStorage.removeItem('auth_token_ingrubio');
  }

  // Verifica si hay un token válido
  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getSubscriberId(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken?.subscriberId || decodedToken?.sub || null;
  }

  // Obtiene los datos del token decodificados
  getDecodedToken(): any {
    const token = this.getToken();
    return token ? this.jwtHelper.decodeToken(token) : null;
  }

  // Obtiene información específica del token
  getTokenData(property: string): any {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken[property] : null;
  }

  // Limpia toda la información de autenticación
  clearAuth(): void {
    this.removeToken();
  }

  // Verifica el token periódicamente (opcional)
  private checkToken(): void {
    const token = this.getToken();
    if (token && this.jwtHelper.isTokenExpired(token)) {
      this.clearAuth();
    }
  }

  // Obtiene tiempo restante hasta expiración (en segundos)
  getTokenExpirationCountdown(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    if (!expirationDate) return null;

    return (expirationDate.getTime() - new Date().getTime()) / 1000;
  }
}
