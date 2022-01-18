import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'queryParams',
})
export class QueryParamsPipe implements PipeTransform {
  transform(value: any): any {
    if (!value || Object.keys(value).length === 0) {
      return null;
    }

    return JSON.stringify(value, null, 4).replace(/ /g, '&nbsp;').replace(/\n/g, '<br/>');
  }
}
