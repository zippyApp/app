import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/auth/login';

  constructor(private http: HttpClient) {}

  login(loginRequest: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, loginRequest);
  }
}
