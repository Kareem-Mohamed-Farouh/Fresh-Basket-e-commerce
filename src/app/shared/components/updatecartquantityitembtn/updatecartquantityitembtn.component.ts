import {
  Component,
  inject,
  Input,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-updatecartquantityitembtn',
  imports: [],
  templateUrl: './updatecartquantityitembtn.component.html',
  styleUrl: './updatecartquantityitembtn.component.scss',
})
export class UpdatecartquantityitembtnComponent {
  private readonly cartService = inject(CartService);
  @Input() idProduct: string = '';
  @Input() countProduct!: number;
  ProductQuantity: WritableSignal<number> = signal(0);
  // ProductQuantity: number = 0;

  updateCartQuantity(newcCount: number) {
    console.log(this.idProduct);
    console.log(newcCount);
    this.ProductQuantity.set(newcCount);

    this.cartService.RemoveSpecificCartItem;
    this.cartService

      .updateCartProductQuantity(this.ProductQuantity(), this.idProduct)
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
          }
          this.countProduct = newcCount;
          this.ProductQuantity.set(newcCount);
        },
      });
  }
}
