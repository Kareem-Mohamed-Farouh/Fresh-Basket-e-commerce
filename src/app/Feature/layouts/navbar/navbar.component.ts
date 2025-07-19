import { CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { CartService } from './../../../core/services/cart/cart.service';
import {
  Component,
  inject,
  Inject,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, CurrencyPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected readonly cartService = inject(CartService);
  protected readonly wishlistService = inject(WishlistService);
}
