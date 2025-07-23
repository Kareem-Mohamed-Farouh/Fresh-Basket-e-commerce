import {
  Component,
  inject,
  input,
  InputSignal,
  OnDestroy,
} from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-addbtn',
  imports: [],
  templateUrl: './addbtn.component.html',
  styleUrl: './addbtn.component.scss',
})
export class AddbtnComponent implements OnDestroy {
  private readonly toastrService = inject(ToastrService);
  private readonly authService = inject(AuthService);

  // @Input() label: string = 'add to cart';
  // @Input() productid!: string;

  // performence in the sky
  label: InputSignal<string> = input('add to cart');
  productid: InputSignal<string> = input('');
  subescribtios: Subscription = new Subscription();

  private readonly cartService = inject(CartService);

  addToCART(): void {
    // console.log(this.productid);
    if (typeof window !== 'undefined' && localStorage.getItem('basketToken')) {
      this.subescribtios = this.cartService
        .addProductToCart(this.productid())
        .subscribe({
          next: (res) => {
            // console.log(res);
            if (res.status == 'success') {
              this.toastrService.success(res.message, '', {
                positionClass: 'toast-bottom-right',
                progressAnimation: 'increasing',
              });
              this.cartService.numOfCartItem.set(res.numOfCartItems);
              this.cartService.totalCartPric.set(res.data.totalCartPrice);
            }
          },
        });
    } else {
      this.toastrService.error('you are Not loggedin signin to add in CART');
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subescribtios.unsubscribe();
  }
}
