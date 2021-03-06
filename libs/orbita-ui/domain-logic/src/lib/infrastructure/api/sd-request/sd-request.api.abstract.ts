import { Observable } from 'rxjs';

import {
  SdRequestsServerData,
  SdRequestServerData,
} from './../../../entities/server-data/sd-request-server-data.interface';
import { PrimeFilter } from './../../../entities/prime-filter.interface';

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
   * @param filters - фильтры
   */
  abstract query(page: number, perPage: number, filters: PrimeFilter): Observable<SdRequestsServerData>;

  /**
   * Получает с сервера выбранную заявку
   *
   * @param id - ID заявки
   */
  abstract show(id: number): Observable<SdRequestServerData>;

  /**
   * Создает заявку
   *
   * @param formData - данные новой заявки
   */
  abstract create(formData: FormData): Observable<SdRequestServerData>;

  /**
   * Обновляет данные по заявке
   *
   * @param id - ID заявки
   * @param formData - новые данные заявки
   */
  abstract update(id: number, formData: FormData): Observable<SdRequestServerData>;
}
