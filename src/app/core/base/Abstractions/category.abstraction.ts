import { Observable } from 'rxjs';

export abstract class categoryabstraction {
  abstract getAllCategory(): Observable<any>;
  abstract getSpicificCategory(): Observable<any>;
}
