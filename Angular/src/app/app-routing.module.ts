import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'home/:products', component: ProductsComponent },
  { path: 'home/:product/:id', component: ProductDetailComponent },
];

export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  useHash: false
});