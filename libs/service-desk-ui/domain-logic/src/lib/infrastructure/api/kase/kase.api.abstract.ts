import { Observable } from 'rxjs';

import { KaseQueryResult } from './../../../entities/server-data/kase-query-result.interface';
import { KaseFilter } from '../../../entities/view-models/kase-filters.interface';

export abstract class KaseApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список заявок
   *
   * @param id - ID категории
   */
  abstract query(filters: KaseFilter): Observable<KaseQueryResult>;
}
