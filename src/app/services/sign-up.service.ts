import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from 'src/environments/types';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  private apiUrl = 'http://localhost:8089/auth'; 

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }
  getUser(token: string): Observable<Person> {
    const headers = new HttpHeaders({'token': `${token}`});
    return this.http.get<Person>(`${this.apiUrl}/user`, { headers });
  }
}
