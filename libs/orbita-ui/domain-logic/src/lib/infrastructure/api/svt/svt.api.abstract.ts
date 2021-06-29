import { Observable } from 'rxjs';

import { SvtItem } from './../../../entities/models/svt/svt-item.interface';
import { PrimeFilter } from './../../../entities/prime-filter.interface';

export abstract class SvtApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Возвращает найденную по штрих-коду ВТ
   *
   * @param barcode - штрих-код
   */
  abstract showItem(barcode: number): Observable<SvtItem>;

  // /**
  //  * Получает с сервера список ВТ, ограниченный указанной страницей и фильтрами.
  //  *
  //  * @param page - номер страницы
  //  * @param perPage - число записей на странице
  //  * @param filters - фильтры
  //  */
  // abstract queryItems(page: number, perPage: number, filters: PrimeFilter): Observable<SvtItem[]>;

  // /**
  //  * Получает список ВТ, закрепленный за пользователем
  //  *
  //  * @param idTn - IdTn пользователя
  //  */
  // abstract queryUserItems(idTn: number): Observable<SvtItem[]>;
}
