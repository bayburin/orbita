import { Observable } from 'rxjs';

import { KaseForm } from './../../../entities/form/kase-form.interface';
import { KaseQueryResult } from './../../../entities/server-data/kase-query-result.interface';
import { KaseFilter } from '../../../entities/view-models/kase-filters.interface';
import { RatingForm } from '../../../entities/form/rating-form.interface';

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

  /**
   * Отправляет запрос на отмену заявки
   *
   * @param caseId - номер заявки
   */
  abstract revoke(caseId: number): Observable<void>;

  /**
   * Отправляет запрос на изменение заявки
   *
   * @param caseId - номер заявки
   * @param data - новые данные по заявке
   */
  abstract update(caseId: number, data: RatingForm): Observable<void>;

  /**
   * Сохраняет заявку
   *
   * @param formData - данные о заявке.
   */
  abstract save(formData: KaseForm): Observable<void>;
}
