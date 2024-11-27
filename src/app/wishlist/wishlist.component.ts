import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  movies: any[] = [];
  isTableView = true; // true: Table View, false: Infinite Scroll

  ngOnInit(): void {
    this.loadWishlist();
  }

  // Local Storage에서 찜한 영화 데이터 로드
  loadWishlist(): void {
    const storedMovies = localStorage.getItem('wishlist');
    this.movies = storedMovies ? JSON.parse(storedMovies) : [];
  }

  // 찜한 영화 삭제
  removeFromWishlist(movieId: number): void {
    const storedMovies = localStorage.getItem('wishlist');
    let wishlist = storedMovies ? JSON.parse(storedMovies) : [];
    wishlist = wishlist.filter((movie: any) => movie.id !== movieId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.movies = wishlist;
  }

  // View 전환
  toggleView(): void {
    this.isTableView = !this.isTableView;
  }
}
