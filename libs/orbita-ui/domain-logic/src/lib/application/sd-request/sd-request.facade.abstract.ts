import { Observable, of } from 'rxjs';
import { LazyLoadEvent } from 'primeng/api';

import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { SdRequestServerData } from './../../entities/server-data/sd-request-server-data.interface';
export abstract class SdRequestFacadeAbstract {
  /**
   * Выбранная заявка
   */
  // selected$: Observable<"" | 0 | SdRequestViewModel | undefined> = of();

  /**
   * Индекс первой строки на странице
   */
  firstRowIndex$: Observable<number> = of();

  /**
   * Общее число записей
   */
  totalCount$: Observable<number> = of();

  /**
   * Максимальное число записей для одной страницы
   */
  perPage$: Observable<number> = of();

  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean> = of();

  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean> = of();

  /**
   * Загружает список заявок с метаданными (количество заявок, номер страницы, и т.д.)
   */
  loadSdRequests$: Observable<void | SdRequestServerData> = of();

  /**
   * Список заявок
   */
  all$: Observable<SdRequestViewModel[]> = of();

  /**
   * Устанавливает метаданные таблицы
   *
   * @param data - метаданные для загрузки данных таблицы
   */
  abstract setTableMetadata(data: LazyLoadEvent): void;
}
