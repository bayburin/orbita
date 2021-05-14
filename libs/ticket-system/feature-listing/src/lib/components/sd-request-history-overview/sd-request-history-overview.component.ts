import { Component, Input } from '@angular/core';

import { SdRequest } from '@orbita/ticket-system/domain-logic';
import { Work } from '@orbita/ticket-system/domain-logic';
import { History } from '@orbita/ticket-system/domain-logic';
import { EventTypeNames, EventTypeNamesData, getEventTypeName } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss']
})
export class SdRequestHistoryOverviewComponent {
  @Input() sdRequest: SdRequest;

  trackByWork(_index: number, work: Work) {
    return work.id;
  }

  trackByHistory(_index: number, history: History) {
    return history.id;
  }

  eventTypeName(type: EventTypeNames): EventTypeNamesData {
    return getEventTypeName(type);
  }
}
