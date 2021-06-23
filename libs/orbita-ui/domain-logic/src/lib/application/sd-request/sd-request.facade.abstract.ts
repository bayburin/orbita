import { Observable } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import {
  SdRequestsServerData,
  SdRequestServerData,
} from './../../entities/server-data/sd-request-server-data.interface';

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
   * Загружает указанную заявку
   */
  loadSelected$: Observable<void | SdRequestServerData>;
  /**
   * Выбранная заявка
   */
  selected$: Observable<SdRequestViewModel>;

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
}
