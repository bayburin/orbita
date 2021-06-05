import { Observable, of } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  Priorities,
  PrioritiesViewModel,
  getViewModelPriority,
  WorkViewModel,
  Statuses,
  StatusesViewModel,
  getViewModelStatus,
  SdRequestViewModel,
  WorkerViewModel,
} from '@orbita/orbita-ui/domain-logic';
import { oFlatMap } from '@orbita/orbita-ui/utils';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
   * Индекс первой строки на странице
   */
  @Input() firstRowIndex$: Observable<number> = of(null);
  /**
   * Общее число записей
   */
  @Input() totalCount$: Observable<number> = of(null);
  /**
   * Максимальный размер записей на странице
   */
  @Input() perPage$: Observable<number> = of(null);
  /**
   * События изменения метаданных таблицы (пагинация, сортировка, фильтры)
   */
  @Output() tableChanged = new EventEmitter<LazyLoadEvent>();

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
