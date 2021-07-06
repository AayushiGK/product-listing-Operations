import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class searchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(element => {
        return (element.p_description.search(searchText) !== -1 || element.p_category.search(searchText) !== -1);
      });
    }
  }
}
