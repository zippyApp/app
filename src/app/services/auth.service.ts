import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/environments/types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8089/auth';

  constructor(private http: HttpClient) {}

  login(loginRequest: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginRequest);
  }

  getUser(token: string): Observable<Person> {
    const headers = new HttpHeaders({'token': `${token}`});
    return this.http.get<Person>(`${this.apiUrl}/user`, { headers });
  }
}
