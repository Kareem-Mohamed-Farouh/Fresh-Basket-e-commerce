import {
  Component,
  computed,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../core/services/cart/cart.service';
import { ICart } from '../../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;
  tranlate: WritableSignal<boolean> = signal(true);
  cartID: WritableSignal<string> = signal('');
  cartData: WritableSignal<ICart> = signal({} as ICart);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastrService);
  private readonly ordersService = inject(OrdersService);
  private readonly formBuilder = inject(FormBuilder);
  ngOnInit(): void {
    this.getcartItemInfo();
    this.fireForm();
  }

  getcartItemInfo() {
    this.cartService.getLogedUserCart().subscribe({
      next: (res) => {
        if (res.status == 'success') {
          console.log(res.data.products);
          console.log(res);
          this.cartData.set(res.data);
          this.cartID.set(res.cartId);
        }
      },
    });
  }

  fireForm() {
    this.checkoutForm = this.formBuilder.group({
      details: [null, [Validators.required, Validators.minLength(3)]],
      phone: [
        null,
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ],
      ],
      city: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  checkOute() {
    console.log(this.checkoutForm.value);
    if (this.checkoutForm.valid) {
      this.ordersService
        .checkoutSession(this.checkoutForm.value, this.cartID())
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              this.toastr.success('go to strip');
              open(res.session.url, '_self');
            }
          },
        });
    }
  }

  tanslat() {
    this.tranlate.update((p) => !p);
  }
}
