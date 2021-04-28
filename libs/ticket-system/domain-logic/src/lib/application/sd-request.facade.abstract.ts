import { Observable } from 'rxjs';

import { SdRequest } from './../entities/sd-request.interface';

/**
 * Фасад для обращений к объектам SdRequest
 */
export abstract class SdRequestFacadeAbstract {
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Список заявок
   */
  all$: Observable<SdRequest[]>;

  /**
   * Выбранная заявка
   */
  selected$: Observable<SdRequest>;

  /**
   * Загружает список заявок
   */
  abstract loadAll(): void;
}
