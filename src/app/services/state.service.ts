import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private wishlistSubject = new BehaviorSubject<string[]>([]);

  getWishlist() {
    return this.wishlistSubject.asObservable();
  }

  addToWishlist(movie: string) {
    const currentList = this.wishlistSubject.value;
    this.wishlistSubject.next([...currentList, movie]);
  }
}
