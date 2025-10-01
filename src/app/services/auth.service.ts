import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://dummyjson.com/auth/login';

  constructor(private http: HttpClient) {}

  //data login bisa diambil dari https://dummyjson.com/users
  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('currentUser', JSON.stringify(response));
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
  }
}
