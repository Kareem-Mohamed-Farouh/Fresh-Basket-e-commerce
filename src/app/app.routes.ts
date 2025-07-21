import { Routes, ActivatedRoute } from '@angular/router';
import { islogedinGuard } from './core/guards/islogedin/islogedin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    canActivate: [islogedinGuard],
    path: 'login',
    loadComponent: () =>
      import('./Feature/pages/login/login.component').then(
        (c) => c.LoginComponent
      ),
    title: 'login',
  },
  {
    canActivate: [islogedinGuard],
    path: 'register',
    loadComponent: () =>
      import('./Feature/pages/register/register.component').then(
        (c) => c.RegisterComponent
      ),
    title: 'register',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./Feature/pages/home/home.component').then(
        (c) => c.HomeComponent
      ),
    title: 'home',
  },
  {
    path: 'productdetails/:id',
    loadComponent: () =>
      import('./Feature/pages/prodetails/prodetails.component').then(
        (c) => c.ProdetailsComponent
      ),
    title: 'productdetails',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./Feature/pages/shop/shop.component').then(
        (c) => c.ShopComponent
      ),
    title: 'shop',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./Feature/pages/cart/cart.component').then(
        (c) => c.CartComponent
      ),
    title: 'cart',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./Feature/pages/wishlist/wishlist.component').then(
        (c) => c.WishlistComponent
      ),
    title: 'wishlist',
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./Feature/pages/aboutus/aboutus.component').then(
        (c) => c.AboutusComponent
      ),
    title: 'about us',
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./Feature/pages/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
    title: 'contact',
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./Feature/pages/blog/blog.component').then(
        (c) => c.BlogComponent
      ),
    title: 'blog',
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./Feature/pages/allorder/allorder.component').then(
        (c) => c.AllorderComponent
      ),
    title: 'allorders',
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./Feature/pages/checkout/checkout.component').then(
        (c) => c.CheckoutComponent
      ),
    title: 'checkout',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./Feature/pages/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'Not Found',
  },
];
