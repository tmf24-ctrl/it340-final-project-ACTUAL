import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service'; // import auth service
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
  	FormsModule,
	CommonModule,
  	RouterModule
  ],
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  qrCode: string = ''; // for 2FA QR code

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Call AuthService to register user
    this.authService.register(this.email, this.password).subscribe({
      next: (res) => {
        this.qrCode = res.qr; // save QR code returned by backend
        alert("Account created successfully! Scan the QR code with your authenticator app.");
      },
      error: (err) => {
        console.error(err);
        alert("Registration failed. Maybe this email is already registered.");
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
