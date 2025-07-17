import { Observable } from 'rxjs';

export abstract class productabstractions {
  abstract getAllProducts(): Observable<any>;
  abstract getSpicificProduct(id: string): Observable<any>;
}
