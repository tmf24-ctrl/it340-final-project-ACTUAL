import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterModule]
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  token: string = ''; // 2FA token (optional)

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  login() {
    // Basic input validation
    if (this.email.trim() === '' || this.password.trim() === '') {
      alert('Please enter both email and password!');
      return;
    }

    // Send login request to auth service
    this.http.post<any>('http://10.10.10.30:4000/login', {
      email: this.email,
      password: this.password,
      token: this.token
    }).subscribe({
      next: (res) => {
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
        }
      }
    });
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
