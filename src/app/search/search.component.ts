import { Component, OnInit } from '@angular/core';
import { TMDBService } from '../services/tmdb.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
getImageUrl(arg0: any) {
throw new Error('Method not implemented.');
}
  movies: any[] = [];
  genres: any[] = [];
  filters = {
    genre: null,
    rating: null,
    sort: 'popularity.desc',
    year: null
  };
  currentPage = 1;
  isTableView = true; // true: Table View, false: Infinite Scroll
  isLoading = false;

  constructor(private tmdbService: TMDBService) {}

  ngOnInit(): void {
    this.loadGenres();
    this.searchMovies();
  }

  loadGenres(): void {
    this.tmdbService.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  searchMovies(): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.tmdbService.searchMovies(this.filters, this.currentPage).subscribe((data) => {
      this.movies = this.isTableView ? data.results : [...this.movies, ...data.results];
      this.isLoading = false;
    });
  }

  // 필터 변경 시
  applyFilters(): void {
    this.movies = [];
    this.currentPage = 1;
    this.searchMovies();
  }

  // 초기화 버튼
  resetFilters(): void {
    this.filters = {
      genre: null,
      rating: null,
      sort: 'popularity.desc',
      year: null
    };
    this.applyFilters();
  }

  // 무한 스크롤
  onScroll(): void {
    if (!this.isTableView && !this.isLoading) {
      this.currentPage++;
      this.searchMovies();
    }
  }
}
