import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from './../../../core/services/cart/cart.service';
import {
  Component,
  computed,
  inject,
  PLATFORM_ID,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { routes } from '../../../app.routes';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CurrencyPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected readonly cartService = inject(CartService);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  protected readonly wishlistService = inject(WishlistService);
  // performence in the sky
  // cartcount: Signal<number> = computed(() => this.cartService.numOfCartItem());
  // totalcartprice: Signal<number> = computed(() => this.cartService.totalCartPric());

  userData: WritableSignal<Object> = signal({});
  private readonly platId = inject(PLATFORM_ID);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('basketToken')) {
        this.authService.LogInBtn.set(false);
        this.userData = jwtDecode(localStorage.getItem('basketToken')!);
        console.log(this.userData);
      }
    }
  }

  logout() {
    localStorage.removeItem('basketToken');
    this.router.navigate(['/login']);
    this.authService.LogInBtn.set(true);
  }
}
