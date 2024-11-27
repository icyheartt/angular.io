import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from '../../layout/header/header.component';
import { TMDBService } from '../../services/tmdb.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  movies: any[] = [];
  genres: any = {};
  currentPage = 1;

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {
    this.loadMovies();
    this.loadGenres();
  }

  loadMovies() {
    this.tmdbService.getPopularMovies(this.currentPage).subscribe((data) => {
      this.movies = data.results;
    });
  }

  loadGenres() {
    this.tmdbService.getGenres().subscribe((data) => {
      data.genres.forEach((genre: any) => {
        this.genres[genre.id] = genre.name;
      });
    });

  } 

getImageUrl(path: string): string {
  return `https://image.tmdb.org/t/p/w500${path}`;
  
  }

getGenres(genreIds: number[]): string {
  return genreIds.map((id) => this.genres[id]).join(', ');
  }
}