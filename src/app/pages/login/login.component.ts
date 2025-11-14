import { Component } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ RouterOutlet, RouterModule ]
})

export class LoginComponent {
  email: string = '';
  password: string ='';
  
  constructor(private router: Router) {}
  
  login() {
    console.log('Logging in with:', this.email, this.password);
    
    //later calling api service
  }
  
  goToSignup() {
    console.log("Navigate to signup page");
    
    //later: router.navigate(['/signup']);
  }
}
