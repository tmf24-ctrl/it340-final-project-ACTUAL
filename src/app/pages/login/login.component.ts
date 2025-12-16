import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],  // Import FormsModule here for ngModel
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    console.log('Logging in with:', this.email, this.password);

    // Check if email and password are non-empty strings
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      this.router.navigate(['/home']);  // Navigate to the homepage route
    } else {
      alert("Please enter both email and password!");
    }
  }

  goToSignup() {
    console.log("Navigate to signup page");
    this.router.navigate(['/signup']);
  }
}

