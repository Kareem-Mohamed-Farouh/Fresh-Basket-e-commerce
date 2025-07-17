import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { brandsEndPoint } from '../../base/enums/brands.endPoint';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private httpClient: HttpClient) {}

  getAllBrands(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${brandsEndPoint.allBrands}`
    );
  }
  getSpecificBrands(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${brandsEndPoint.specificBrands}id`
    );
  }
}
