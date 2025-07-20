import { Component, inject, signal, WritableSignal } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { IWishlist } from '../../../shared/interfaces/Iwishlist';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent {
  wishlistData: WritableSignal<IWishlist[]> = signal<IWishlist[]>([]);
  // res: IWishstatues = {} as IWishstatues;
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);
  private readonly cartService = inject(CartService);

  // wishlistData!: IWhishlist[];
  ngOnInit(): void {
    this.getwishlistData();
  }
  getwishlistData() {
    this.wishlistService.getProductInWishlist().subscribe({
      next: (res) => {
        console.log('RES', res);
        // this.res = res;
        this.wishlistData.set(res.data);
        this.wishlistService.Wishlistcount.set(res.count);
      },
    });
  }

  addItemToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          this.cartService.numOfCartItem.set(res.numOfCartItems);
          this.cartService.totalCartPric.set(res.data.totalCartPrice);
          console.log(res);
          this.cartService.numOfCartItem.set(res.numOfCartItems);
          this.toastrService.success(res.message, '', {
            positionClass: 'toast-bottom-right',
            progressAnimation: 'increasing',
            progressBar: true,
          });
        }
      },
    });
  }

  removProductFromWishlist(idprodd: string) {
    this.wishlistService.removeProductFromWishlist(idprodd).subscribe({
      next: (res) => {
        if (res.status == 'success') {
          console.log('res', res);
          this.toastrService.info(res.message, '', {
            positionClass: 'toast-bottom-right',
            progressAnimation: 'increasing',
          });
          this.getwishlistData();
        }
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
}
