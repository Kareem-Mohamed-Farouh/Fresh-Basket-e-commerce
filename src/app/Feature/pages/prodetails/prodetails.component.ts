import {
  Component,
  effect,
  inject,
  Pipe,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProductdetails } from '../../../shared/interfaces/iproductdetails';
import { CurrencyPipe } from '@angular/common';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-prodetails',
  imports: [CurrencyPipe, CarouselModule, RouterLink],
  templateUrl: './prodetails.component.html',
  styleUrl: './prodetails.component.scss',
})
export class ProdetailsComponent {
  private readonly productsService = inject(ProductsService);
  private readonly activatedRoute = inject(ActivatedRoute);
  idprod: WritableSignal<string> = signal<string>('');
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  ProductData: WritableSignal<IProductdetails> = signal({} as IProductdetails);
  sub!: Subscription;

  constructor() {
    effect((onCleanup) => {
      const id = this.idprod();
      if (id) {
        this.getproductdata(id);
        onCleanup(() => {
          this.sub.unsubscribe();
        });
      }
    });
  }
  ngOnInit(): void {
    this.getSpcificProductID();
    this.getAllProductData();
  }

  getAllProductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res);
        this.products.set(res.data);
      },
    });
  }

  getSpcificProductID(): void {
    this.activatedRoute.paramMap.subscribe(
      (res) =>
        // this.idprod.set(res.get('id')!) //true
        this.idprod.set(res.get('id') ?? '') //true,
    );
  }
  getproductdata(id: string): void {
    this.sub = this.productsService.getSpicificProduct(id).subscribe({
      next: (res) => {
        console.log(res.data);
        this.ProductData.set(res.data);
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
    },
    nav: true,
  };
}
