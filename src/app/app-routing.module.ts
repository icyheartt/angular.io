
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { MainComponent } from './main/main.component';
import { PopularComponent } from './popular/popular.component';
import { SearchComponent } from './search/search.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AuthGuard } from './guards/auth.guards';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: '', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'signin' },
  { path: 'popular', component: PopularComponent },
  { path: 'search', component: SearchComponent },
  { path: 'wishlist', component: WishlistComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
