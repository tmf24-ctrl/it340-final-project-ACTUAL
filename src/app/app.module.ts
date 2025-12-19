import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';  // Import standalone AppComponent
import { AppRoutingModule } from './app-routing.module'; // Import AppRoutingModule
import {HomeComponent} from './pages/homepage/home.component'; //import home page

@NgModule({
  imports: [
    BrowserModule,
    HomeComponent,
    AppRoutingModule,  // Import AppRoutingModule here
    AppComponent,      // Import standalone AppComponent (do NOT declare it)
  ],
  providers: [],
  bootstrap: [AppComponent]  // Use AppComponent in bootstrap
})
export class AppModule { }

