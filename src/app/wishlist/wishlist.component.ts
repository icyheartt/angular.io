
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  @Output() movieSelected = new EventEmitter<string>();

  selectMovie(movie: string) {
    this.movieSelected.emit(movie);
  }
  constructor() { }
}
