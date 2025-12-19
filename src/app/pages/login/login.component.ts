import { Component } from '@angular/core';
<<<<<<< HEAD
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
=======
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
>>>>>>> 81da32bf656cc018edee2dd6daabfc09f9963404

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
<<<<<<< HEAD
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
=======
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  token: string = ''; // 2FA token (optional)
>>>>>>> 81da32bf656cc018edee2dd6daabfc09f9963404

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

<<<<<<< HEAD
  startLogin() {
    console.log('startLogin clicked', this.email, this.password);
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }
    this.show2FAModal = true;
  }

  confirm2FA() {
=======
  login() {
    // Basic input validation
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Please enter both email and password!');
      return;
    }

    // Send login request to auth service
>>>>>>> 81da32bf656cc018edee2dd6daabfc09f9963404
    this.http.post<any>('http://10.10.10.30:4000/login', {
      email: this.email,
      password: this.password,
      token: this.token
    }).subscribe({
      next: (res) => {
<<<<<<< HEAD
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
=======
        console.log('Login response:', res);

        if (res.token) {
          // Save JWT
          localStorage.setItem('jwt', res.token);

          alert('Login Successful!');
          this.router.navigate(['/home']);
        } else {
          alert('Login failed');
        }
      },
      error: (err) => {
        console.error('Login error:', err);

        if (err.status === 401) {
          alert('Invalid email or password');
        } else if (err.status === 403) {
          alert('Invalid authentication code');
        } else {
          alert('Server error. Please try again later.');
>>>>>>> 81da32bf656cc018edee2dd6daabfc09f9963404
        }
      }
    });
  }
<<<<<<< HEAD

  cancel2FA() {
    this.show2FAModal = false;
    this.token = '';
    this.errorMessage = '';
  }
=======
>>>>>>> 81da32bf656cc018edee2dd6daabfc09f9963404

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
