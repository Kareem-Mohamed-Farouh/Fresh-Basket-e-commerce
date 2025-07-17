import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductsService } from '../../../core/services/products/products.service';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { AddbtnComponent } from '../addbtn/addbtn.component';

@Component({
  selector: 'app-slider',
  imports: [CarouselModule, AddbtnComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit {
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllProductData();
  }

  getAllProductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.products.set(res.data);
      },
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
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
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };
}
