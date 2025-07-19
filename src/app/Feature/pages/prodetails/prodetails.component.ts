import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-prodetails',
  imports: [],
  templateUrl: './prodetails.component.html',
  styleUrl: './prodetails.component.scss',
})
export class ProdetailsComponent {
  private readonly productsService = inject(ProductsService);
}
