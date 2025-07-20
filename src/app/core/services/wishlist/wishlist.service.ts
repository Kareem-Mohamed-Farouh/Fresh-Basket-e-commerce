import { log } from 'console';
import { HttpClient } from '@angular/common/http';
import {
  Injectable,
  signal,
  WritableSignal,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { wishlistEndpoint } from '../../base/enums/wishlist.endPoint';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  Wishlistcount: WritableSignal<number> = signal<number>(0);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);
  constructor(private httpClient: HttpClient) {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      this.getProductInWishlist().subscribe({
        next: (res) => {
          if (res.status == 'success') {
            // console.log('res', res);
            this.Wishlistcount.set(res.count);
          }
        },
      });
    }
  }

  addProductToWishlist(productid: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${wishlistEndpoint.addWishlist}`,
      {
        productId: productid,
      }
    );
  }
  removeProductFromWishlist(productid: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}${wishlistEndpoint.remaoveWishlist}${productid}`
    );
  }
  getProductInWishlist(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${wishlistEndpoint.getWishlistItems}`
    );
  }
}
