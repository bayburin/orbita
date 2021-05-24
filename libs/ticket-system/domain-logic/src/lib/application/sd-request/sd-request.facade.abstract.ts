import { Observable, of } from 'rxjs';

import { SdRequestViewModel } from './../../entities/view-models/sd-request-view-model.interface';
import { SdRequestQueue } from './../../entities/sd-request-queue.interface';

export abstract class SdRequestFacadeAbstract {
  /**
   * Выбранная заявка
   */
  // TODO: Исправить
  // selected$: Observable<"" | 0 | SdRequest | undefined> = of();

  /**
   * Номер текущей страницы
   */
  page$: Observable<number> = of();

  /**
   * Общее число записей
   */
  totalCount$: Observable<number> = of();

  /**
   * Максимальное число записей для одной страницы
   */
  maxSize$: Observable<number> = of();

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
  loadSdRequests$: Observable<void | SdRequestQueue> = of();

  /**
   * Список заявок
   */
  all$: Observable<SdRequestViewModel[]> = of();

  /**
   * Устанавливает номер страницы
   *
   * @param page - номер страницы
   */
  abstract setPage(page: number): void;
}
