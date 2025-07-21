import { ToastrIconClasses } from './../../../../../node_modules/ngx-toastr/toastr/toastr-config.d';
import { Icategory } from './../../../shared/interfaces/icategory';
import { CategoryService } from './../../../core/services/category/category.service';
import {
  Component,
  Inject,
  inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { SliderComponent } from '../../../shared/components/slider/slider.component';
import { AddbtnComponent } from '../../../shared/components/addbtn/addbtn.component';
import { UpdatecartquantityitembtnComponent } from '../../../shared/components/updatecartquantityitembtn/updatecartquantityitembtn.component';
import { ToastrService } from 'ngx-toastr';
import { StaticsliderComponent } from '../../../shared/components/staticslider/staticslider.component';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { IWishlist } from '../../../shared/interfaces/Iwishlist';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    SliderComponent,
    AddbtnComponent,
    RouterLink,

    StaticsliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  categories: WritableSignal<Icategory[]> = signal<Icategory[]>([]);
  wishlistData: WritableSignal<IWishlist[]> = signal<IWishlist[]>([]);
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly categoryService = inject(CategoryService);
  private readonly wishlistService = inject(WishlistService);
  private readonly authService = inject(AuthService);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  subescribtios: Subscription = new Subscription();

  ngOnInit(): void {
    this.getAllProductData();
    this.getALLCategoryData();
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      if (localStorage.getItem('basketToken')) {
        this.getwishlistData();
      }
    }
  }

  getAllProductData() {
    this.subescribtios = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res);
        this.products.set(res.data);
      },
    });
  }
  getALLCategoryData() {
    this.subescribtios = this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        // console.log(res);
        this.categories.set(res.data);
      },
    });
  }

  getwishlistData() {
    this.subescribtios = this.wishlistService.getProductInWishlist().subscribe({
      next: (res) => {
        if (res.status == 'success') {
          console.log('RES WISHLIST', res);
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

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
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
        items: 2,
      },
      740: {
        items: 5,
      },
      940: {
        items: 6,
      },
    },
    nav: true,
  };

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subescribtios.unsubscribe();
  }
}
