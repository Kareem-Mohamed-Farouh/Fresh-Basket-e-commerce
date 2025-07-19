import { ToastrIconClasses } from './../../../../../node_modules/ngx-toastr/toastr/toastr-config.d';
import { Icategory } from './../../../shared/interfaces/icategory';
import { CategoryService } from './../../../core/services/category/category.service';
import {
  Component,
  Inject,
  inject,
  OnInit,
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
export class HomeComponent implements OnInit {
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  categories: WritableSignal<Icategory[]> = signal<Icategory[]>([]);
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  private readonly categoryService = inject(CategoryService);
  wishlistData: WritableSignal<IWishlist[]> = signal<IWishlist[]>([]);
  // res: IWishstatues = {} as IWishstatues;
  private readonly wishlistService = inject(WishlistService);
  ngOnInit(): void {
    this.getAllProductData();
    this.getALLCategoryData();
    this.getwishlistData();
  }

  getAllProductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res);
        this.products.set(res.data);
      },
    });
  }
  getALLCategoryData() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        // console.log(res);
        this.categories.set(res.data);
      },
    });
  }
  getwishlistData() {
    this.wishlistService.getProductInWishlist().subscribe({
      next: (res) => {
        // console.log('RES WISHLIST', res);
        // this.res = res;
        this.wishlistData.set(res.data);
        this.wishlistService.Wishlistcount.set(res.count);
      },
    });
  }

  addProductToWishList(product: string) {}

  removProductFromWishlist(product: string) {}

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
}
