import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdRequestsTableComponent {
  @Input() sdRequests$: Observable<SdRequest[]> = of([]);
}
