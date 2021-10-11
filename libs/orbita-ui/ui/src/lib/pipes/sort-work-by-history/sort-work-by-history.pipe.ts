import { Pipe, PipeTransform } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';
import { WorkViewModel } from '@orbita/orbita-ui/domain-logic';

@Pipe({
  name: 'sortWorkByHistory',
})
export class SortWorkByHistoryPipe implements PipeTransform {
  constructor(private authHelper: AuthHelper) {}

  transform(works: WorkViewModel[]): WorkViewModel[] {
    const currentGroupId = this.authHelper.getJwtPayload().group_id;

    return works.slice().sort((a, b) => {
      if (a.group_id === currentGroupId) {
        return -1;
      } else if (a.histories.length == 0 && b.histories.length != 0) {
        return 1;
      } else if (a.histories.length != 0 && b.histories.length == 0) {
        return -1;
      }

      return 0;
    });
  }
}
