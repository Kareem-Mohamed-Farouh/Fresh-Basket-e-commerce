import { Component, inject, signal, WritableSignal } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category.service';
import { ProductsService } from '../../../core/services/products/products.service';
import { Icategory } from '../../../shared/interfaces/icategory';
import { IProduct } from '../../../shared/interfaces/iproduct';
import { AddbtnComponent } from '../../../shared/components/addbtn/addbtn.component';

@Component({
  selector: 'app-shop',
  imports: [AddbtnComponent],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  products: WritableSignal<IProduct[]> = signal<IProduct[]>([]);
  // Products shown after filters/search/sorting applied
  filteredProducts: WritableSignal<IProduct[]> = signal<IProduct[]>([]);

  // Available categories and brands for filtering
  categories: string[] = [];
  brands: string[] = [];

  // Selected filters
  selectedBrands = new Set<string>();
  selectCategory = new Set<string>();
  private readonly productsService = inject(ProductsService);

  ngOnInit(): void {
    this.getAllProductData();
  }

  getAllProductData() {
    this.productsService.getAllProducts().subscribe({
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
}
