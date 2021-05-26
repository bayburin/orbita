import { Observable } from 'rxjs';

import { SdRequestServerData } from './../../../entities/server-data/sd-request-server-data.interface';

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
  abstract query(page: number, perPage: number): Observable<SdRequestServerData>;
}
