import { HttpClient } from '@angular/common/http';
import {
  inject,
  Inject,
  Injectable,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { Http2SecureServer } from 'http2';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { cartEndPoint } from '../../base/enums/cart.endPoint';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  numOfCartItem: WritableSignal<number> = signal<number>(0);
  totalCartPric: WritableSignal<number> = signal<number>(0);
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.getLogedUserCart().subscribe({
        next: (res) => {
          // console.log('ress', res.numOfCartItems);
          this.numOfCartItem.set(res.numOfCartItems);
          this.totalCartPric.set(res.data.totalCartPrice);
        },
      });
    }
  }

  addProductToCart(Id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${cartEndPoint.addToCart}`,
      {
        productId: Id,
      }
    );
  }

  updateCartProductQuantity(cont: number, productid: string): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}${cartEndPoint.updateCartQuantity}${productid}`,
      { count: cont }
    );
  }

  getLogedUserCart(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${cartEndPoint.getLogedUserCart}`
    );
  }

  RemoveSpecificCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}${cartEndPoint.removeSpecificCartItem}${productId}`
    );
  }
  crealCart(): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}${cartEndPoint.clearCart}`
    );
  }
}
