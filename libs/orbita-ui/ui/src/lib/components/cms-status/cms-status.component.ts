import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CmsStatuses, CmsStatusesViewModel, getViewModelCmsStatuses } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-cms-status',
  templateUrl: './cms-status.component.html',
  styleUrls: ['./cms-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CmsStatusComponent {
  @Input() status: CmsStatuses;

  /**
   * Возвращает объект CmsStatusesViewModel, в котором содержатся данные о статусе программы Аудит
   */
  get cmsStatusVm(): CmsStatusesViewModel {
    return getViewModelCmsStatuses(this.status);
  }
}
