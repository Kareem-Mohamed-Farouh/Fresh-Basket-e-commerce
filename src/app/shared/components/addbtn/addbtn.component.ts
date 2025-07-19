import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { log } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addbtn',
  imports: [],
  templateUrl: './addbtn.component.html',
  styleUrl: './addbtn.component.scss',
})
export class AddbtnComponent {
  private readonly toastrService = inject(ToastrService);

  @Input() label: string = 'add to cart';
  @Input() productid!: string;

  private readonly cartService = inject(CartService);

  addToCART(): void {
    // console.log(this.productid);

    this.cartService.addProductToCart(this.productid).subscribe({
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
  }
}
