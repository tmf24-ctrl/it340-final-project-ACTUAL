import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://10.10.10.30:4000';

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

}
