import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,    // Needed for *ngIf
    FormsModule,     // Needed for ngModel
    RouterModule,    // Needed for routerLink & navigate
    HttpClientModule // Needed for HttpClient
  ]
})
export class LoginComponent {
  email = '';
  password = '';
  token = '';

  show2FAModal = false;
  errorMessage = '';

  constructor(private router: Router, private http: HttpClient) {}

  startLogin() {
    console.log('startLogin clicked', this.email, this.password);
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }
    this.show2FAModal = true;
  }

  confirm2FA() {
    this.http.post<any>('http://10.10.10.10:4000/login', {
      email: this.email,
      password: this.password,
      token: this.token
    }).subscribe({
      next: (res) => {
        localStorage.setItem('jwt', res.token);
        this.show2FAModal = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401) {
          this.errorMessage = 'Invalid email or password';
        } else if (err.status === 403) {
          this.errorMessage = 'Invalid authenticator code';
        } else {
          this.errorMessage = 'Server error';
        }
      }
    });
  }

  cancel2FA() {
    this.show2FAModal = false;
    this.token = '';
    this.errorMessage = '';
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
