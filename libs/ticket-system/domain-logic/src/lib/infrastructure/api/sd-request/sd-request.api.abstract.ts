import { Observable } from 'rxjs';

import { SdRequestQueue } from './../../../entities/sd-request-queue.interface';

/**
 * Содержит API заявок для обращения к серверу
 */
export abstract class SdRequestApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список заявок, ограниченный указанной страницей и фильтрами.
   *
   * @param page - номер страницы
   * @param perPage - число записей на странице
   */
  abstract query(page: number, perPage: number): Observable<SdRequestQueue>;
}
