import { ICart } from './../../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import {
  Component,
  inject,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';

import { UpdatecartquantityitembtnComponent } from '../../../shared/components/updatecartquantityitembtn/updatecartquantityitembtn.component';
import { RouterLink } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  ProductQuantity: WritableSignal<number> = signal(0);
  cartitemnumber: WritableSignal<number> = signal(0);
  cartData: WritableSignal<ICart> = signal({} as ICart);
  subescribtios: Subscription = new Subscription();

  private readonly cartService = inject(CartService);
  ngOnInit(): void {
    this.getcartItemInfo();
  }

  getcartItemInfo() {
    this.subescribtios = this.cartService.getLogedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartData.set(res.data);
        this.cartService.numOfCartItem.set(res.numOfCartItems);
        this.cartService.totalCartPric.set(res.data.totalCartPrice);
        this.cartitemnumber.set(res.numOfCartItems);
      },
    });
  }
  removeProduct(productid: string) {
    this.subescribtios = this.cartService
      .RemoveSpecificCartItem(productid)
      .subscribe({
        next: (res) => {
          console.log('TextTrack', res.data);
          this.cartData.set(res.data);
          this.getcartItemInfo();
          this.cartService.numOfCartItem.set(res.numOfCartItems);
          // this.cartService.totalCartPric.set(res.totalCartPrice);
          this.cartitemnumber.set(res.numOfCartItems);
        },
      });
  }

  updateCartQuantity(newcCount: number, idProduct: string) {
    // console.log(idProduct);
    // console.log(newcCount);
    this.ProductQuantity.set(newcCount);
    this.subescribtios = this.cartService
      .updateCartProductQuantity(this.ProductQuantity(), idProduct)
      .subscribe({
        next: (res) => {
          // console.log(res);
          if (res.status == 'success') {
            this.getcartItemInfo();
            // this.ProductQuantity.set(res.numOfCartItems);
          }
        },
      });
  }

  clearrCart() {
    this.subescribtios = this.cartService.crealCart().subscribe({
      next: (res) => {
        console.log(res);
        this.getcartItemInfo();
        this.cartitemnumber.set(res.numOfCartItems);
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subescribtios.unsubscribe();
  }
}
