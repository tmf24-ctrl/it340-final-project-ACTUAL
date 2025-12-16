import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';  // Import LoginComponent
import { SignupComponent } from './pages/signup/signup.component';  // Import SignupComponent
import { HomePageComponent } from './pages/homepage/home.component';  // Import HomePageComponent

const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Route for Login
  { path: 'signup', component: SignupComponent },  // Route for Signup
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', 
  	loadComponent: () =>
  		import('./pages/homepage/home.component')
  		.then(m => m.HomePageComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Import RouterModule with routes
  exports: [RouterModule],
})
export class AppRoutingModule {}

