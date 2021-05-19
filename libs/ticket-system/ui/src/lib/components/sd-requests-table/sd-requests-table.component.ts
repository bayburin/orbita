import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Priorities, PrioritiesData, getSdRequestPriority, Work, UserWork } from '@orbita/ticket-system/domain-logic';
import { Statuses, StatusesData, getSdRequestStatus } from '@orbita/ticket-system/domain-logic';
import { oFlatMap } from '@orbita/ticket-system/utils';

import { SdRequest } from '@orbita/ticket-system/domain-logic';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdRequestsTableComponent {
  /**
   * Список выводимых столбцов
   */
  displayedColumns = [
    'id',
    'createdAt',
    'finishedAtPlan',
    'status',
    'serviceName',
    'ticketName',
    'description',
    'priority',
    'workers',
    'finished_at',
    'actions'
  ];
  /**
   * Массив заявок
   */
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

  /**
   * Возвращает текущий список исполнителей для указанной заявки
   *
   * @param sdRequest - заяка
   */
  workers(sdRequest: SdRequest): UserWork[] {
    return oFlatMap((work: Work) => work.workers, sdRequest.works);
  }

  trackBySdRequest(index: number, sdRequest: SdRequest): number {
    return sdRequest.id;
  }

  trackByUserWork(index: number, worker: UserWork): number {
    return worker.id;
  }
}
