import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  Priorities,
  PrioritiesViewModel,
  getViewModelPriority,
  WorkViewModel,
  Statuses,
  StatusesViewModel,
  getViewModelStatus,
  SdRequestViewModel,
  WorkerViewModel } from '@orbita/ticket-system/domain-logic';
import { oFlatMap } from '@orbita/ticket-system/utils';

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
  @Input() sdRequests$: Observable<SdRequestViewModel[]> = of([]);

  /**
   * Возвращает объект PrioritiesViewModel, в котором содержатся данные о приоритете для представления
   *
   * @param priority - приоритет
   */
  priority(priority: Priorities): PrioritiesViewModel {
    return getViewModelPriority(priority);
  }

  /**
   * Возвращает объект StatusesViewModel, в котором содержатся данные о статусе для представления
   *
   * @param status - статус
   */
  status(status: Statuses): StatusesViewModel {
    return getViewModelStatus(status);
  }

  /**
   * Возвращает текущий список исполнителей для указанной заявки
   *
   * @param sdRequest - заяка
   */
  workers(sdRequest: SdRequestViewModel): WorkerViewModel[] {
    return oFlatMap((work: WorkViewModel) => work.workers, sdRequest.works);
  }

  trackBySdRequest(index: number, sdRequest: SdRequestViewModel): number {
    return sdRequest.id;
  }

  trackByWorker(index: number, worker: WorkerViewModel): number {
    return worker.id;
  }
}
