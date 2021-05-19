import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fioMiddleName'
})
export class FioMiddleNamePipe implements PipeTransform {
  transform(fio: string): unknown {
    return fio.split(' ')[0];
  }
}
