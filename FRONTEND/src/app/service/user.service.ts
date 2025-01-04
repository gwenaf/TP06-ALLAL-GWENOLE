// src/app/service/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  username: string;
  email: string;
  address?: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getUser(): Observable<User> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get<User>(`${this.baseUrl}/user`, { headers });
  }

  updateUser(data: Partial<User>): Observable<User> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<User>(`${this.baseUrl}/user`, data, { headers });
  }
}
