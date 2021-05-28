import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
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
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SdRequestsTableComponent {
  /**
   * Массив заявок
   */
  @Input() sdRequests$: Observable<SdRequestViewModel[]> = of([]);
  /**
   * Индикатор загрузки
   */
  @Input() loading$: Observable<boolean> = of(null);
  /**
   * Номер страницы
   */
  @Input() page$: Observable<number> = of(null);
  /**
   * Общее число записей
   */
  @Input() totalCount$: Observable<number> = of(null);
  /**
   * Максимальный размер записей на странице
   */
  @Input() maxSize$: Observable<number> = of(null);
  /**
   * Событие изменения номера страницы. Возвращает новый номер страницы
   */
  @Output() pageChanged = new EventEmitter<number>();

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

  /**
   * Событие изменения номера страницы, сортировки или фильтров
   *
   * @param event
   */
  loadSdRequests(event: LazyLoadEvent) {
    const currentPage = event.first / event.rows + 1;

    this.pageChanged.emit(currentPage);
  }

  trackBySdRequest(index: number, sdRequest: SdRequestViewModel): number {
    return sdRequest.id;
  }

  trackByWorker(index: number, worker: WorkerViewModel): number {
    return worker.id;
  }
}
