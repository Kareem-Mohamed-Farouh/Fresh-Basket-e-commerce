import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http2SecureServer } from 'http2';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { cartEndPoint } from '../../base/enums/cart.endPoint';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  addProductToCart(productId: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${cartEndPoint.addToCart}`,
      { productId: productId }
    );
  }

  updateCartProductQuantity(count: string, productId: string): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}${cartEndPoint.updateCartQuantity}productId`,
      { count: count }
    );
  }

  getLogedUserCart(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${cartEndPoint.getLogedUserCart}`
    );
  }

  RemoveSpecificCartItem(productId: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}${cartEndPoint.removeSpecificCartItem}productId`
    );
  }
  crealCart(): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}${cartEndPoint.clearCart}`
    );
  }
}
