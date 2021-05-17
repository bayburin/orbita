import { Component, Input } from '@angular/core';

import { SdRequest } from '@orbita/ticket-system/domain-logic';
import { Work } from '@orbita/ticket-system/domain-logic';
import { History } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss']
})
export class SdRequestHistoryOverviewComponent {
  /**
   * Заявка
   */
  @Input() sdRequest: SdRequest;
  /**
   * Событие (история), которое произошло самым последним в текущей заявке
   */
  lastHistory: History;

  trackByWork(_index: number, work: Work): number {
    return work.id;
  }

  trackByHistory(_index: number, history: History): number {
    return history.id;
  }
}