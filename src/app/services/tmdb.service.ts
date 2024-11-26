
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TMDBService {
  private apiKey: string = 'YOUR_TMDB_API_KEY';
  private baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url);
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=1`;
    return this.http.get(url);
  }

  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get(url);
  }
}
