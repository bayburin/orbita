import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { SdRequestsServerData } from './../../entities/server-data/sd-request-server-data.interface';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { NewSdRequestViewForm } from './../../entities/forms/new-sd-request-view-form.interface';

export abstract class SdRequestFacadeAbstract {
  /**
   * Индекс первой строки на странице
   */
  firstRowIndex$: Observable<number>;
  /**
   * Общее число записей
   */
  totalCount$: Observable<number>;
  /**
   * Максимальное число записей для одной страницы
   */
  perPage$: Observable<number>;
  /**
   * Поле для сортировки
   */
  sortField$: Observable<string>;
  /**
   * Порядок сортировки
   */
  sortOrder$: Observable<number>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Загружает список заявок с метаданными (количество заявок, номер страницы, и т.д.)
   */
  loadSdRequests$: Observable<void | SdRequestsServerData>;
  /**
   * Список заявок
   */
  all$: Observable<SdRequestViewModel[]>;
  /**
   * Содержит ошибку, возникшую в процессе загрузки или обработки заявки
   */
  error$: Observable<any>;
  /**
   * Выбранная заявка
   */
  selectedEntity$: Observable<SdRequestViewModel>;
  /**
   * Скелетон, показывающий начальную загрузку страницы просмотра заявки
   */
  selectedSkeleton$: Observable<boolean>;
  /**
   * Флаг, отображающий режим редактирования
   */
  selectedEditMode$: Observable<boolean>;
  /**
   * Содержит ошибку, возникшую в процессе загрузки или обработки заявки
   */
  selectedError$: Observable<string>;
  /**
   * Форма существующей заявки
   */
  formEntity$: Observable<SdRequestViewForm>;
  /**
   * Индикатор загрузки существующей формы
   */
  formLoading$: Observable<boolean>;
  /**
   * Форма новой заявки
   */
  newFormEntity$: Observable<NewSdRequestViewForm>;
  /**
   * Индикатор загрузки новой формы
   */
  newFormLoading$: Observable<boolean>;

  /**
   * Устанавливает метаданные таблицы
   *
   * @param data - метаданные для загрузки данных таблицы
   */
  abstract setTableMetadata(data: LazyLoadEvent): void;

  /**
   * Перезагружает данные таблицы заявок
   */
  abstract reloadTableData(): void;

  /**
   * Загружает выбранную заявку
   */
  abstract loadSelectedSdRequest(): void;

  /**
   * Очищает данные о выбранной заявке и связанные с ней объекты
   */
  abstract clearSelected(): void;

  /**
   * Активирует или отключает режим редактирования при просмотре заявки
   */
  abstract toggleEditMode(): void;

  /**
   * Сохраняет данные существующей формы в хранилище
   *
   * @param form - данные формы
   */
  abstract changeForm(form: SdRequestViewForm): void;

  /**
   * Обновляет данные по выбранной заявке
   */
  abstract updateForm(): void;

  /**
   * Очищает все данные по заявкам и их составляющих
   */
  abstract clearAll(): void;

  /**
   * Сохраняет данные новой формы в хранилище
   *
   * @param form - данные формы
   */
  abstract changeNewForm(form: NewSdRequestViewForm): void;

  /**
   * Сохраняет данные формы новой заявки
   */
  abstract createForm(): void;
}
