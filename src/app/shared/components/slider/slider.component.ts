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
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  imports: [CarouselModule, AddbtnComponent],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
})
export class SliderComponent implements OnInit {
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  subescribtios: Subscription = new Subscription();
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllProductData();
  }

  getAllProductData() {
    this.subescribtios = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
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
    autoplayTimeout: 2000,
    autoHeight: false,
    autoplaySpeed: 700,
    dots: false,
    smartSpeed: 500,
    navSpeed: 500,
    navText: [
      '<i class="fa-solid fa-angle-left"></i>',
      '<i class="fa-solid fa-angle-right"></i>',
    ],
    responsive: {
      0: {
        items: 2,
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

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subescribtios.unsubscribe();
  }
}
