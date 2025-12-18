import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = environment.authUrl;

  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http.post<{ qr: string }>(
      `${this.authUrl}/register`,
      { email, password }
    );
  }

  login(email: string, password: string, token: string) {
    return this.http.post<{ token: string }>(
      `${this.authUrl}/login`,
      { email, password, token }
    );
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
