import { distinctUntilChanged, switchMap, delay } from 'rxjs/operators';
import { Subject, Subscription, of } from 'rxjs';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { SvtItem, svtTypes } from '@orbita/orbita-ui/domain-logic';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'lib-svt-items-table',
  templateUrl: './svt-items-table.component.html',
  styleUrls: ['./svt-items-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvtItemsTableComponent implements OnInit, OnDestroy {
  // ================================= Атрибуты для исправления бага, описанного ниже =================================

  lazyLoadStream = new Subject<LazyLoadEvent>();
  subscriptions = new Subscription();

  // ==================================================================================================================

  /**
   * Список типов ВТ
   */
  itemTypes = svtTypes;
  /**
   * Список свойств контекстного меню
   */
  contextMenuItems: MenuItem[];
  /**
   * Выбранная ВТ
   */
  selectedItem: SvtItem;
  /**
   * Список найденной техники
   */
  @Input() items: SvtItem[];
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
   * Событие выбора ВТ для создания заявки
   */
  @Output() newSdRequest = new EventEmitter<SvtItem>();
  @ViewChild('table') table: Table;

  ngOnInit(): void {
    this.subscribeToLazyLoadEvent();
    this.contextMenuItems = [
      {
        label: 'Новая заявка',
        icon: 'mdi mdi-file-plus-outline mdi-18px',
        command: () => this.newSdRequest.emit(this.selectedItem),
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
