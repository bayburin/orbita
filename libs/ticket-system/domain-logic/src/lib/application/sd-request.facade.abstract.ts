import { Observable } from 'rxjs';

import { SdRequest } from './../entities/sd-request.interface';

/**
 * Фасад для обращений к объектам SdRequest
 */
export abstract class SdRequestFacadeAbstract {
  /**
   * Список заявок
   */
  all$: Observable<SdRequest[]>;

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
   * Загружает список заявок с указанием номера страницы и фильтров
   */
  abstract loadAll(): void;

  /**
   * Устанавливает номер страницы
   *
   * @param page - номер страницы
   */
  abstract setPage(page: number): void;
}
