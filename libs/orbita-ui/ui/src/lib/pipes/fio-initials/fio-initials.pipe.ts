import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fioInitials',
})
export class FioInitialsPipe implements PipeTransform {
  transform(fio: string): unknown {
    if (!fio) {
      return '';
    }

    const arr = fio.split(' ');
    const initials = arr
      .slice(1)
      .map((str) => `${str[0]}.`)
      .join(' ');
    const result = arr[0];

    return initials ? `${result} ${initials}` : result;
  }
}
