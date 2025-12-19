import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http'; //import http client

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, RouterModule],  // Import FormsModule here for ngModel
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  token: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    console.log('Logging in with:', this.email, this.password);

    // Check if email and password are non-empty strings
    if (this.email.trim() !== '' && this.password.trim() !== '') {
      this.router.navigate(['/home']);  // Navigate to the homepage route
    } else {
      alert("Please enter both email and password!");
      return;
    }
    
    this.http.post<any>('http://10.10.10.10:4001/login', {
    	email: this.email,
    	password: this.password,
    	token: this.token //optional if using 2fa
    }).subscribe({
    	next: (res) => {
    		console.log('Login response:', res);
    		
    		if (res.token) {
    			localStorage.setItem('jwt', res.token);
    			alert('Login Successful!')
    			this.router.navigate(['/home']);
    		} else {
			alert('Login failed: ' + (res.error || 'Unknown error'));
		}
    	},
    	error: (err) => {
    		console.error('Login API error:', err);
    		alert('Server error');
    	}
  });
}

  goToSignup() {
    console.log("Navigate to signup page");
    this.router.navigate(['/signup']);
  }
}
	
