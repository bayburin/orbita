import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({
  name: 'datetime',
})
export class DatetimePipe implements PipeTransform {
  transform(value: string): string {
    return value ? moment(value).format('DD.MM.YY HH:mm') : '';
  }
}
