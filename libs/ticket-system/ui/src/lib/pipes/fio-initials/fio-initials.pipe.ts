import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fioInitials'
})
export class FioInitialsPipe implements PipeTransform {
  transform(fio: string): unknown {
    const arr = fio.split(' ');

    return `${arr[0]} ${arr[1][0]}. ${arr[2][0]}.`;
  }
}
