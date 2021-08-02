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

  /**
   * Получает с сервера список ВТ, ограниченный фильтрами.
   *
   * @param filters - фильтры
   */
  abstract queryItems(filters: PrimeFilter): Observable<SvtItem[]>;
}
