import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guards';
import {HomeMainComponent} from './components/home/main/home-main.component';
import {HomeWishlistComponent} from './components/home/wishlist/home-wishlist.component';
import {HomeSearchComponent} from './components/search/home-search.component';
import {HomePopularComponent} from './components/home/popular/home-popular.component';
import { SignInComponent } from './signin/signin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: HomeMainComponent },
      { path: 'popular', component: HomePopularComponent },
      { path: 'wishlist', component: HomeWishlistComponent },
      { path: 'search', component: HomeSearchComponent }  
    ]
  },
  { path: 'signin', component: SignInComponent }, 
  { path: '**', redirectTo: 'signin' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// auth.guard.ts
