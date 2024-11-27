
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {
  getGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}/genre/movie/list?api_key=${this.apiKey}&language=ko-KR`);
  }
  private apiKey: string = 'YOUR_TMDB_API_KEY';
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(page: number): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url);
  }

  searchMovies(filters: any, page: number): Observable<any> {
    const params: any = {
      api_key: this.apiKey,
      language: 'en-US',
      page
    };
  
    if (filters.genre) params.with_genres = filters.genre;
    if (filters.rating) params['vote_average.gte'] = filters.rating;
    if (filters.year) params.primary_release_year = filters.year;
    if (filters.sort) params.sort_by = filters.sort;
  
    return this.http.get(`${this.baseUrl}/discover/movie`, { params });
  }

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get(url);
  }
}
