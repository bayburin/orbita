import { Observable, of } from 'rxjs';

import { SdRequest } from './../entities/sd-request.interface';
import { SdRequestQueue } from './../entities/sd-request-queue.interface';

/**
 * Фасад для обращений к объектам SdRequest
 */
export abstract class SdRequestFacadeAbstract {
  /**
   * Выбранная заявка
   */
  selected$: Observable<"" | 0 | SdRequest | undefined> = of();

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
  all$: Observable<SdRequest[]> = of();

  /**
   * Устанавливает номер страницы
   *
   * @param page - номер страницы
   */
  abstract setPage(page: number): void;
}
