import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { orderEndPoint } from '../../base/enums/order.endPoint';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private httpClient: HttpClient) {}

  createCashOrder(orderDetails: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${orderEndPoint.creatCashOrder}65cb72e38462ab02c71ee050`,
      {
        shippingAddress: orderDetails,
      }
    );
  }
  getAllOrder(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${orderEndPoint.getAllOrder}`
    );
  }
  getUserOrder(userId: object): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${orderEndPoint.getUserOrder}`
    );
  }
  checkoutSession(orderDetails: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}${orderEndPoint.checkOutSession}66c91634ed0dc0016c217bb3?url=http://localhost:3000`,
      {
        shippingAddress: orderDetails,
      }
    );
  }
}
