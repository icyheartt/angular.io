
import { Component, OnInit } from '@angular/core';
import { TMDBService } from '../services/tmdb.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  movies: any[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private tmdbService: TMDBService) { }

  ngOnInit(): void {
    this.fetchPopularMovies();
  }

  fetchPopularMovies(): void {
    this.tmdbService.getPopularMovies().subscribe({
      next: (response) => {
        this.movies = response.results;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load movies. Please try again later.';
        this.loading = false;
      }
    });
  }
}
