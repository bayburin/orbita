import { Observable } from 'rxjs';

import { SdRequest } from './../entities/sd-request.interface';
import { SdRequestQueue } from './../entities/sd-request-queue.interface';

/**
 * Фасад для обращений к объектам SdRequest
 */
export abstract class SdRequestFacadeAbstract {
  /**
   * Выбранная заявка
   */
  selected$: Observable<SdRequest>;

  /**
   * Номер текущей страницы
   */
  page$: Observable<number>;

  /**
   * Общее число записей
   */
  totalCount$: Observable<number>;

  /**
   * Максимальное число записей для одной страницы
   */
  maxSize$: Observable<number>;

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
  loadSdRequests$: Observable<void | SdRequestQueue>;

  /**
   * Список заявок
   */
  all$: Observable<SdRequest[]>;

  /**
   * Устанавливает номер страницы
   *
   * @param page - номер страницы
   */
  abstract setPage(page: number): void;
}
