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
export class HomeComponent {
  searchQuery: string = '';

 posts = [
  {
    title: 'Synthwave Dreams',
    author: 'DJ Aurora',
    date: '2024-10-02',
    tags: ['synthwave', 'electronic'],
    image: 'assets/images/synthwave.jpg',
    content: 'A deep dive into retro-futuristic soundscapes...',
    audioPreview: 'assets/audio/synth-preview.mp3',
    likes: 0,
  },
  {
    title: 'Indie Essentials',
    author: 'Skyline Avenue',
    date: '2024-09-18',
    tags: ['indie', 'alternative'],
    image: 'assets/images/indie.jpg',
    content: 'Exploring the best new indie tracks of the year...',
    audioPreview: 'assets/audio/indie-preview.mp3',
    likes: 0,
  },
  {
    title: 'Lo-Fi Chill Beats',
    author: 'Mellow Mood',
    date: '2024-11-01',
    tags: ['lofi', 'chill'],
    image: 'assets/images/lofi.jpg',
    content: 'Relax and study with these smooth lo-fi tracks...',
    audioPreview: 'assets/audio/lofi-preview.mp3',
    likes: 0,
  },
  {
    title: 'Epic Orchestral Journeys',
    author: 'Symphony Sage',
    date: '2024-08-22',
    tags: ['orchestral', 'epic'],
    image: 'assets/images/orchestral.jpg',
    content: 'An exploration of cinematic orchestral soundtracks...',
    audioPreview: 'assets/audio/orchestral-preview.mp3',
    likes: 0,
  },
  {
    title: 'Future Bass Vibes',
    author: 'Neon Pulse',
    date: '2024-07-15',
    tags: ['future bass', 'electronic'],
    image: 'assets/images/futurebass.jpg',
    content: 'Energetic and melodic future bass tracks for your playlist...',
    audioPreview: 'assets/audio/futurebass-preview.mp3',
    likes: 0,
  },
  {
    title: 'Chillout Lounge',
    author: 'Relaxa',
    date: '2024-06-30',
    tags: ['chillout', 'lounge'],
    image: 'assets/images/chillout.jpg',
    content: 'Ambient tunes perfect for relaxing at home...',
    audioPreview: 'assets/audio/chillout-preview.mp3',
    likes: 0,
  },
  {
    title: 'Rock Revival',
    author: 'The Riffs',
    date: '2024-09-05',
    tags: ['rock', 'alternative'],
    image: 'assets/images/rock.jpg',
    content: 'Classic rock vibes with a modern twist...',
    audioPreview: 'assets/audio/rock-preview.mp3',
    likes: 0,
  },
  {
    title: 'Deep House Nights',
    author: 'Bassline Queen',
    date: '2024-10-12',
    tags: ['deep house', 'electronic'],
    image: 'assets/images/deephouse.jpg',
    content: 'Smooth deep house tracks for your evening set...',
    audioPreview: 'assets/audio/deephouse-preview.mp3',
    likes: 0,
  },
  {
    title: 'Acoustic Mornings',
    author: 'Strum & Co',
    date: '2024-08-10',
    tags: ['acoustic', 'folk'],
    image: 'assets/images/acoustic.jpg',
    content: 'Gentle acoustic songs to start your day right...',
    audioPreview: 'assets/audio/acoustic-preview.mp3',
    likes: 0,
  },
  {
    title: 'Trap Beats Collection',
    author: '808 King',
    date: '2024-11-05',
    tags: ['trap', 'hip-hop'],
    image: 'assets/images/trap.jpg',
    content: 'High-energy trap beats for producers and fans alike...',
    audioPreview: 'assets/audio/trap-preview.mp3',
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

