import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import FormsModule if you plan to use ngModel

@Component({
  standalone: true,  // Important for standalone components
  selector: 'app-home-page',  // Make sure this matches the selector used in HTML
  templateUrl: './home.component.html',  // Path to your HTML file
  styleUrls: ['./home.component.css'],  // Path to your CSS file (if you have one)
  imports: [CommonModule, FormsModule],  // Import necessary Angular modules
})
export class HomePageComponent {
  searchQuery: string = '';

  posts = [
    {
      title: 'Synthwave Dreams',
      author: 'DJ Aurora',
      date: '2024-10-02',
      tags: ['synthwave', 'electronic'],
      image: 'assets/images/synthwave.jpg',  // Make sure this path is correct
      content: 'A deep dive into retro-futuristic soundscapes...',
      audioPreview: 'assets/audio/synth-preview.mp3',  // Make sure this path is correct
      likes: 0,
    },
    {
      title: 'Indie Essentials',
      author: 'Skyline Avenue',
      date: '2024-09-18',
      tags: ['indie', 'alternative'],
      image: 'assets/images/indie.jpg',  // Make sure this path is correct
      content: 'Exploring the best new indie tracks of the year...',
      audioPreview: 'assets/audio/indie-preview.mp3',  // Make sure this path is correct
      likes: 0,
    }
  ];

  // Method to filter posts based on search query
  filteredPosts() {
    return this.posts.filter(post =>
      post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery.toLowerCase()))
    );
  }

  // Optional: like a post
  likePost(post: any) {
    post.likes = post.likes ? post.likes + 1 : 1;  // Increment likes
  }
}

