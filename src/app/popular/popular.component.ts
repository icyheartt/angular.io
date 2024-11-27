import { Component, OnInit, HostListener } from '@angular/core';
import { TMDBService } from '../services/tmdb.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit{
getImageUrl(arg0: any) {
throw new Error('Method not implemented.');
}
  movies: any[] = [];
  currentPage = 1;
  isTableView = true;

  isLoading = false;
  showScrollToTop = false;

  constructor(private tmdbService: TMDBService) { }

  ngOnInit(): void {
    this.loadMovies(this.currentPage);
  }

  loadMovies(page: number): void {
    if (this.isLoading) return;

    this.isLoading = true;
    this.tmdbService.getPopularMovies(page).subscribe((data) => {
      this.movies = this.isTableView ? data.results : [...this.movies, ...data.results];
      this.isLoading = false;
    });
  }

  // 테이블 뷰와 무한 스크롤 전환
  toggleView(): void {
    this.isTableView = !this.isTableView;
    this.movies = [];
    this.currentPage = 1;
    this.loadMovies(this.currentPage);
  }

  // 페이지 이동
  changePage(direction: number): void {
    this.currentPage += direction;
    this.loadMovies(this.currentPage);
  }

  // 무한 스크롤 구현
  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!this.isTableView && !this.isLoading && (window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.currentPage++;
      this.loadMovies(this.currentPage);
    }

    // Top 버튼 상태 업데이트
    this.showScrollToTop = window.scrollY > 200;
  }

  // 맨 위로 이동
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
