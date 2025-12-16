import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // To enable *ngFor in templates
import { FormsModule } from '@angular/forms';   // To enable ngModel for two-way binding
import { HomePageComponent } from './home.component';  // Import the standalone component

@NgModule({
  imports: [
    CommonModule,  // Import CommonModule to enable *ngFor
    FormsModule,   // Import FormsModule to enable ngModel
    HomePageComponent,  // Import HomePageComponent directly (not in declarations)
  ],
  exports: [HomePageComponent]  // Export HomePageComponent if needed
})
export class HomeModule {}

