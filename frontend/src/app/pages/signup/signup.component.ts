import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [FormsModule],  // Import FormsModule here for ngModel
})
export class SignupComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router) {}

  register() {
    console.log("Registering user:", this.email);

    if (this.password !== this.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Account created successfully!");
    this.router.navigate(['/']);  // Navigate to home or another route
  }

  goToLogin() {
    this.router.navigate(['/login']);  // Navigate to login page
  }
}

