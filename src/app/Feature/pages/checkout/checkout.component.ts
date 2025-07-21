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

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  cartData: WritableSignal<ICart> = signal({} as ICart);
  private readonly cartService = inject(CartService);
  ngOnInit(): void {
    this.getcartItemInfo();
    this.fireForm();
  }

  getcartItemInfo() {
    this.cartService.getLogedUserCart().subscribe({
      next: (res) => {
        console.log(res.data.products);
        console.log(res.data);
        this.cartData.set(res.data);
      },
    });
  }

  private readonly formBuilder = inject(FormBuilder);

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
      city: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  tranlate: WritableSignal<boolean> = signal(true);
  tanslat() {
    this.tranlate.update((p) => !p);
  }
}
