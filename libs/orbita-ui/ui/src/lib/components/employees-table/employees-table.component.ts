import { distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
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
import { EmployeeShort } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Subject, Subscription, of } from 'rxjs';
import { EmployeeFilters } from '@orbita/orbita-ui/domain-logic';
import { Table } from 'primeng/table';

@Component({
  selector: 'lib-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesTableComponent implements OnInit, OnDestroy {
  // ================================= Атрибуты для исправления бага, описанного ниже =================================

  lazyLoadStream = new Subject<LazyLoadEvent>();
  subscriptions = new Subscription();

  // ==================================================================================================================

  /**
   * Список фильтров
   */
  filters = EmployeeFilters;
  /**
   * Список свойств контекстного меню
   */
  contextMenuItems: MenuItem[];
  /**
   * Выбранный работник
   */
  selectedEmployee: EmployeeShort;
  /**
   * Список найденных работников
   */
  @Input() employees: EmployeeShort[];
  /**
   * Индикатор загрузки
   */
  @Input() loading: boolean;
  /**
   * События изменения фильтров таблицы
   */
  @Output() filterChanged = new EventEmitter<LazyLoadEvent>();
  /**
   * Событие очистики всех фильтров таблицы
   */
  @Output() filterCleared = new EventEmitter<void>();
  /**
   * Событие выбора пользователя для его детального просмотра
   */
  @Output() viewEmployee = new EventEmitter<EmployeeShort>();
  /**
   * Событие выбора пользователя для создания заявки
   */
  @Output() newSdRequest = new EventEmitter<EmployeeShort>();
  @ViewChild('table') table: Table;

  ngOnInit(): void {
    this.subscribeToLazyLoadEvent();
    this.contextMenuItems = [
      {
        label: 'Подробно',
        icon: 'mdi mdi-account-search-outline mdi-18px',
        command: () => this.viewEmployee.emit(this.selectedEmployee),
      },
      {
        label: 'Новая заявка',
        icon: 'mdi mdi-file-plus-outline mdi-18px',
        command: () => this.newSdRequest.emit(this.selectedEmployee),
      },
    ];
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  clearTable() {
    this.table.clear();
    this.filterCleared.emit();
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
        .subscribe((event) => this.filterChanged.emit(event))
    );
  }
}
