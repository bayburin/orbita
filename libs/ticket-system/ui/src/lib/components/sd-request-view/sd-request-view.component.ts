import { Component } from '@angular/core';

import { SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-request-view',
  templateUrl: './sd-request-view.component.html',
  styleUrls: ['./sd-request-view.component.scss']
})
export class SdRequestViewComponent {
  sdRequest: SdRequest;
}
