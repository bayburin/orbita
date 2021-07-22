import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CsaStatuses, CsaStatusesViewModel, getViewModelCsaStatuses } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-csa-status',
  templateUrl: './csa-status.component.html',
  styleUrls: ['./csa-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CsaStatusComponent {
  @Input() status: CsaStatuses;

  /**
   * Возвращает объект CmsStatusesViewModel, в котором содержатся данные о статусе программы Аудит
   */
  get csaStatusVm(): CsaStatusesViewModel {
    return getViewModelCsaStatuses(this.status);
  }
}
