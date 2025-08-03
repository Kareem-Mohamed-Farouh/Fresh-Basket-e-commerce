import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  input,
  InputSignal,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Icategory } from '../../interfaces/icategory';
import { IProduct } from '../../interfaces/iproduct';
import { IWishlist } from '../../interfaces/Iwishlist';
import { RouterLink } from '@angular/router';
import { AddbtnComponent } from '../addbtn/addbtn.component';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CarouselModule, AddbtnComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  products: InputSignal<IProduct> = input({} as IProduct);

  wishlistData: WritableSignal<IWishlist[]> = signal<IWishlist[]>([]);
  private readonly toastrService = inject(ToastrService);
  private readonly wishlistService = inject(WishlistService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  subescribtios: Subscription = new Subscription();

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('basketToken')) {
        this.getwishlistData();
      }
    }
  }

  getwishlistData() {
    this.subescribtios = this.wishlistService.getProductInWishlist().subscribe({
      next: (res) => {
        if (res.status == 'success') {
          // console.log('RES WISHLIST', res);
          // this.res = res;
          this.wishlistData.set(res.data);
          this.wishlistService.Wishlistcount.set(res.count);
        }
      },
    });
  }

  addProductToWishList(productid: string) {
    if (localStorage.getItem('basketToken')) {
      this.subescribtios = this.wishlistService
        .addProductToWishlist(productid)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.getwishlistData();
            this.toastrService.success(res.message);
          },
        });
    } else {
      this.toastrService.error('you are Not logedin signin to add in wishlist');
    }
  }

  removProductFromWishlist(productid: string) {
    this.subescribtios = this.wishlistService
      .removeProductFromWishlist(productid)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getwishlistData();
          this.toastrService.success(res.message);
        },
      });
  }
  isInWishlist(): boolean {
    return this.wishlistData().some((item) => item._id === this.products()._id);
  }
  cardoption: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,

    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
    },
    nav: false,
  };
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subescribtios.unsubscribe();
  }
}
