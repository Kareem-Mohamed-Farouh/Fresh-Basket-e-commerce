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

@Component({
  selector: 'app-home',
  imports: [CarouselModule, SliderComponent, AddbtnComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  categories: WritableSignal<Icategory[]> = signal<Icategory[]>([]);
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  ngOnInit(): void {
    this.getAllProductData();
    this.getALLCategoryData();
  }

  getAllProductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products.set(res.data);
      },
    });
  }
  getALLCategoryData() {
    this.categoryService.getAllCategory().subscribe({
      next: (res) => {
        console.log(res);
        this.categories.set(res.data);
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
}
