import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userSearchPipe'
})
export class searchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    const searchText = new RegExp(args, 'ig');
    if (value.length != 0) {
      return value.filter(element => {
        return (element.firstName.search(searchText) !== -1 || element.lastName.search(searchText) !== -1);
      });
    }
    else{
      return;
    }
  }
}
