import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { WorkViewModel, HistoryViewModel, SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestHistoryOverviewComponent {
  /**
   * Работы по заявке
   */
  @Input() works: WorkViewModel[];
  /**
   * Событие, которое произошло самым последним в текущей заявке
   */
  @Input() lastHistory: SdRequestViewModel;

  trackByWork(_index: number, work: WorkViewModel): number {
    return work.id;
  }

  trackByHistory(_index: number, history: HistoryViewModel): number {
    return history.id;
  }
}
