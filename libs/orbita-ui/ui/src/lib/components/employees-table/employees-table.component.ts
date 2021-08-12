import { distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeShort } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent } from 'primeng/api';
import { Subject, Subscription, of } from 'rxjs';
import { EmployeeFilters } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent {
  // ================================= Атрибуты для исправления бага, описанного ниже =================================

  lazyLoadStream = new Subject<LazyLoadEvent>();
  subscriptions = new Subscription();

  // ==================================================================================================================

  /**
   * Список фильтров
   */
  filters = EmployeeFilters;
  /**
   * Список найденных работников
   */
  @Input() employees: EmployeeShort[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
  /**
   * События изменения метаданных таблицы (пагинация, сортировка, фильтры)
   */
  @Output() tableChanged = new EventEmitter<LazyLoadEvent>();

  ngOnInit(): void {
    this.subscribeToLazyLoadEvent();
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
