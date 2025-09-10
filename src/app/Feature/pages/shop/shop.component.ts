import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { Icategory } from '../../../shared/interfaces/icategory';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { AddbtnComponent } from '../../../shared/components/addbtn/addbtn.component';
import { UpdatecartquantityitembtnComponent } from '../../../shared/components/updatecartquantityitembtn/updatecartquantityitembtn.component';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICart, Product2 } from '../../../shared/interfaces/icart';
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { IWishlist } from '../../../shared/interfaces/Iwishlist';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../../../shared/components/card/card.component';

@Component({
  selector: 'app-shop',
  imports: [
    AddbtnComponent,
    SearchPipe,
    FormsModule,
    RouterLink,
    CardComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit, OnDestroy {
  // Products shown after filters/search/sorting applied
  // Available categories and brands for filtering
  filteredProducts: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  wishlistData: WritableSignal<IWishlist[]> = signal<IWishlist[]>([]);
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  translate: WritableSignal<boolean> = signal<boolean>(true);
  searshWord: WritableSignal<string> = signal<string>('');
  categories: string[] = [];
  brands: string[] = [];

  // Selected filters
  selectedBrands = new Set<string>();
  selectCategory = new Set<string>();
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly authService = inject(AuthService);
  private readonly productsService = inject(ProductsService);
  private readonly toastrService = inject(ToastrService);
  subescribtios: Subscription = new Subscription();

  ngOnInit(): void {
    this.getAllProductData();
    this.getwishlistData();
  }

  // getcartItemInfo() : void {
  //   this.subescribtios =   this.cartService.getLogedUserCart().subscribe({
  //     next: (res) => {
  //       console.log(res.data.products);
  //       this.cartData.set(res.data.products);
  //     },
  //   });
  // }

  getwishlistData(): void {
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

  addProductToWishList(productid: string): void {
    if (typeof window !== 'undefined' && localStorage.getItem('basketToken')) {
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

  removProductFromWishlist(productid: string): void {
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

  getAllProductData(): void {
    this.subescribtios = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
        this.filteredProducts.set(
          this.products().sort((a, b) => {
            return a.title.localeCompare(b.title);
          })
        );
        this.categories = [
          ...new Set(this.products().map((p) => p.category.name)),
        ];
        this.brands = [...new Set(this.products().map((p) => p.brand.name))];
      },
    });
  }

  toggel(): void {
    this.translate.update((t) => !t);
  }

  ngOnDestroy(): void {
    this.subescribtios.unsubscribe();
  }
}
