import {
  Component,
  inject,
  input,
  Input,
  InputSignal,
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

  countProduct: InputSignal<number> = input(0);
  idProduct: InputSignal<string> = input('');
  ProductQuantity: WritableSignal<number> = signal(0);

  updateCartQuantity(newcCount: number) {
    console.log(this.idProduct());
    console.log(newcCount);
    this.ProductQuantity.set(newcCount);

    this.cartService.RemoveSpecificCartItem;
    this.cartService

      .updateCartProductQuantity(this.ProductQuantity(), this.idProduct())
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
          }

          this.ProductQuantity.set(newcCount);
        },
      });
  }
}
