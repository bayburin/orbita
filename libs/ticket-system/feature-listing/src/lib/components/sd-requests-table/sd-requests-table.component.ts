import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Priorities, PrioritiesData, getSdRequestPriority } from '@orbita/ticket-system/domain-logic';
import { Statuses, StatusesData, getSdRequestStatus } from '@orbita/ticket-system/domain-logic';

import { SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdRequestsTableComponent {
  displayedColumns = ['id', 'createdAt', 'finishedAtPlan', 'priority', 'status', 'serviceName', 'ticketName', 'description', 'actions'];
  @Input() sdRequests$: Observable<SdRequest[]> = of([]);

  /**
   * Возвращает объект PrioritiesData, в котором содержатся данные о приоритете для представления
   *
   * @param priority - приоритет
   */
  priority(priority: Priorities): PrioritiesData {
    return getSdRequestPriority(priority);
  }

  /**
   * Возвращает объект StatusesData, в котором содержатся данные о статусе для представления
   *
   * @param status - статус
   */
  status(status: Statuses): StatusesData {
    return getSdRequestStatus(status);
  }
}
