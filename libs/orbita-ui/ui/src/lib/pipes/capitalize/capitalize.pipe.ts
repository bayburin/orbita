import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value
      .split(' ')
      .map((word) =>
        word
          .split('-')
          .map((str) => str[0].toUpperCase() + str.substring(1).toLowerCase())
          .join('-')
      )
      .join(' ');
  }
}
