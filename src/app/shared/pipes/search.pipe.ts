import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(arrayofObject: any[], searchWord: string): any[] {
    return arrayofObject.filter((p) =>
      p.title.toLowerCase().includes(searchWord.toLowerCase())
    );
  }
}
