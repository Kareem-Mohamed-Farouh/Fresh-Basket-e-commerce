import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  ngOnInit(): void {
    this.fireForm();
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
}
