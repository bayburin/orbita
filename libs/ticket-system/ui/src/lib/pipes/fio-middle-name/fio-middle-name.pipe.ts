import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fioMiddleName'
})
export class FioMiddleNamePipe implements PipeTransform {
  transform(fio: string): unknown {
    if (!fio) {
      return '';
    }

    return fio.split(' ')[0];
  }
}
