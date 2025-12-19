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

  email = '';
  password = '';
  token = '';

  show2FAModal = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  // Step 1: Validate email/password locally
  startLogin() {
    if (!this.email || !this.password) {
      alert('Please enter email and password');
      return;
    }

    // Show 2FA popup
    this.show2FAModal = true;
  }

  // Step 2: Send full login request
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
