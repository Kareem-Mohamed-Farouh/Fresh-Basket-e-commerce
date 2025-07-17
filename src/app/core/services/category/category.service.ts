import { Injectable } from '@angular/core';
import { environment } from '../../base/environments/baseurl.environment';
import { categoryendpoint } from '../../base/enums/category.endpoint';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${categoryendpoint.getAllCategory}`
    );
  }
  getSpicificCategory(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${categoryendpoint.getspecificCategory}`
    );
  }
}
