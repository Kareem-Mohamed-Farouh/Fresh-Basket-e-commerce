import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { signal } from '@angular/core';

@Component({
  selector: 'app-staticslider',
  imports: [CarouselModule],
  templateUrl: './staticslider.component.html',
  styleUrl: './staticslider.component.scss',
})
export class StaticsliderComponent {
  images = [
    '/images/1.avif',
    '/images/2.avif',
    '/images/3.avif',
    '/images/4.avif',
    '/images/cat.avif',
    '/images/dawa.avif',
    '/images/mobile.avif',
  ];
  onImageLoad(event: Event) {
    (event.target as HTMLImageElement).classList.add('loaded');
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoHeight: false,
    lazyLoad: true,
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
