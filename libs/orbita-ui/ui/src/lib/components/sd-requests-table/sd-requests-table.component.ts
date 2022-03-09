import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import {
  WorkViewModel,
  statusesViewModelArray,
  prioritiesViewModelArray,
  SdRequestViewModel,
  WorkerViewModel,
  User,
  SdService,
  SdTicket,
} from '@orbita/orbita-ui/domain-logic';
import { oFlatMap } from '@orbita/orbita-ui/utils';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { Table } from 'primeng/table';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestsTableComponent implements OnInit, OnDestroy {
  // ================================= Атрибуты для исправления бага, описанного ниже =================================

  lazyLoadStream = new Subject<LazyLoadEvent>();
  subscriptions = new Subscription();
  /**
   * Список свойств контекстного меню
   */
  contextMenuItems: MenuItem[];
  /**
   * Выбранная заявка
   */
  selectedSdRequest: SdRequestViewModel;
  /**
   * Таблица заявок
   */
  @ViewChild('table', { static: false }) table: Table;
  /**
   * Список статусов
   */
  statuses = statusesViewModelArray;
  /**
   * Список приоритетов
   */
  priorities = prioritiesViewModelArray;

  /**
   * Массив заявок
   */
  @Input() sdRequests: SdRequestViewModel[];
  /**
   * Массив пользователей
   */
  @Input() users: User[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
  /**
   * Общее число записей
   */
  @Input() totalCount: number;
  /**
   * Список услуг
   */
  @Input() sdServices: SdService[];
  /**
   * Список видов заявок
   */
  @Input() sdTickets: SdTicket[];
  /**
   * События изменения метаданных таблицы (пагинация, сортировка, фильтры)
   */
  @Output() tableChanged = new EventEmitter<LazyLoadEvent>();
  /**
   * Событие выбора заявки для ее детального просмотра
   */
  @Output() viewSdRequest = new EventEmitter<SdRequestViewModel>();
  /**
   * Событие закрытия заявки
   */
  @Output() closeSdRequest = new EventEmitter<number>();

  ngOnInit(): void {
    this.subscribeToLazyLoadEvent();
    this.contextMenuItems = [
      {
        label: 'Подробно',
        icon: 'mdi mdi-file-find-outline mdi-18px',
        command: () => this.viewSdRequest.emit(this.selectedSdRequest),
      },
      // {
      //   label: 'Закрыть заявку',
      //   icon: 'mdi mdi-check mdi-18px',
      //   command: () => this.closeSdRequest.emit(this.selectedSdRequest.id),
      // },
    ];
  }

  get sortedSdRequests(): SdRequestViewModel[] {
    return this.sdRequests.sort((a, b) => (a.id > b.id ? -1 : 1));
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

  // ======= Решение бага, когда генерируется одно и тоже событие перезагрузки таблицы с пустыми фильтрами =======

  /**
   * Событие изменения метаданных таблицы, требующее обновления данных таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  onLazyLoad(event: LazyLoadEvent) {
    const eventObj = JSON.parse(JSON.stringify(event));

    this.lazyLoadStream.next(eventObj);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  /**
   * Подписывается на события изменения метаданных таблицы
   */
  private subscribeToLazyLoadEvent() {
    this.subscriptions.add(
      this.lazyLoadStream
        .pipe(
          distinctUntilChanged((a: LazyLoadEvent, b: LazyLoadEvent) => JSON.stringify(a) === JSON.stringify(b)),
          switchMap((data) => of(data).pipe(delay(300)))
        )
        .subscribe((event) => this.tableChanged.emit(event))
    );
  }
}
