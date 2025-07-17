import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { productabstractions } from '../../base/Abstractions/products.abstractions';
import { productndpoints } from '../../base/enums/products.endpoints';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements productabstractions {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${productndpoints.getAllProduct}`
    );
  }
  getSpicificProduct(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${productndpoints.getSpecificProduct}id`
    );
  }
}
