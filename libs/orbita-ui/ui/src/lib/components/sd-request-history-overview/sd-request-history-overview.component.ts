import { Component, Input } from '@angular/core';
import { WorkViewModel, HistoryViewModel } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss'],
})
export class SdRequestHistoryOverviewComponent {
  /**
   * Работы по заявке
   */
  @Input() works: WorkViewModel[];
  /**
   * Идентификатор события, которое произошло самым последним в текущей заявке
   */
  @Input() lastHistoryId: number;

  trackByWork(_index: number, work: WorkViewModel): number {
    return work.id;
  }

  trackByHistory(_index: number, history: HistoryViewModel): number {
    return history.id;
  }
}
