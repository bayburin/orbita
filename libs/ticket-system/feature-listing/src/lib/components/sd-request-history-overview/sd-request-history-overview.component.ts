import { Component, Input } from '@angular/core';

import { SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-request-history-overview',
  templateUrl: './sd-request-history-overview.component.html',
  styleUrls: ['./sd-request-history-overview.component.scss']
})
export class SdRequestHistoryOverviewComponent {
  @Input() sdRequest: SdRequest;
}
