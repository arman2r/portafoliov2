/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@angular/core';
import { IContact } from '../../Interfaces/IContact.interface';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from '../../Tokens/api-url.token';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient, @Inject(API_BASE_URL) private apiUrl: string) {}

  contactService(dataContact: IContact) {
    return this.http.post(`${this.apiUrl}/contact/send`, dataContact);
  }
}
