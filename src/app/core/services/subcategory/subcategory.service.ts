import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../base/environments/baseurl.environment';
import { subCategoryEndPoint } from '../../base/enums/subCategory.endPoint';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllSupCategory(): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${subCategoryEndPoint.allSubCatecory}`
    );
  }
  getSpecificSubCategory(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${subCategoryEndPoint.spicSubCatecory}id`
    );
  }
  getALLCatOnSubCategory(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}${subCategoryEndPoint.allOnSpicSubCatecory}id/subcategories`
    );
  }
}
