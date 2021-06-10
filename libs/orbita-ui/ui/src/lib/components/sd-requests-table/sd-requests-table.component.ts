import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {
  Priorities,
  PrioritiesViewModel,
  getViewModelPriority,
  WorkViewModel,
  Statuses,
  StatusesViewModel,
  getViewModelStatus,
  statusesViewModelArray,
  prioritiesViewModelArray,
  SdRequestViewModel,
  WorkerViewModel,
  User,
} from '@orbita/orbita-ui/domain-logic';
import { oFlatMap } from '@orbita/orbita-ui/utils';
import { LazyLoadEvent, PrimeNGConfig } from 'primeng/api';
import * as moment from 'moment';

@Component({
  selector: 'lib-sd-requests-table',
  templateUrl: './sd-requests-table.component.html',
  styleUrls: ['./sd-requests-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdRequestsTableComponent implements OnInit {
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
  @Input() sdRequests$: Observable<SdRequestViewModel[]> = of([]);
  /**
   * Массив пользователей
   */
  @Input() users$: Observable<User[]>;
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

  constructor(private config: PrimeNGConfig) {}

  ngOnInit() {
    this.config.setTranslation({
      startsWith: 'Начинается с',
      contains: 'Включает',
      notContains: 'Не включает',
      endsWith: 'Заканчивается на',
      equals: 'Равно',
      notEquals: 'Не равно',
      noFilter: 'Без фильтров',
      lt: 'Меньше чем',
      lte: 'Меньше либо равно',
      gt: 'Больше чем',
      gte: 'Больше либо равно',
      is: 'Является',
      isNot: 'Не является',
      before: 'До',
      after: 'После',
      clear: 'Очистить',
      apply: 'Применить',
      matchAll: 'Совпадает всё',
      matchAny: 'Совпадает любое',
      addRule: 'Добавить правило',
      removeRule: 'Удалить правило',
      accept: 'Да',
      reject: 'Нет',
      choose: 'Выбрать',
      upload: 'Загрузить',
      cancel: 'Отмена',
      dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
      dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
      monthNames: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
      monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
      today: 'Сегодня',
      weekHeader: 'Нд',
      weak: 'Слабый',
      medium: 'Средний',
      strong: 'Сильный',
      passwordPrompt: 'Введите пароль',
      emptyMessage: 'Данные не найдены',
      emptyFilterMessage: 'Данные не найдены',
    });
  }

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
   * Событие изменения метаданных таблицы, требующее обновления данных таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  reloadTable(event: LazyLoadEvent): void {
    const eventObj = JSON.parse(JSON.stringify(event));

    if (eventObj.filters.created_at && eventObj.filters.created_at.value) {
      eventObj.filters.created_at.value = moment(event.filters.created_at.value).format();
    }
    this.tableChanged.emit(eventObj);
  }

  trackBySdRequest(index: number, sdRequest: SdRequestViewModel): number {
    return sdRequest.id;
  }

  trackByWorker(index: number, worker: WorkerViewModel): number {
    return worker.id;
  }
}
