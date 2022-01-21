import { Observable } from 'rxjs';

import { Service } from '../../../../entities/models/service.interface';

export abstract class AdminServiceApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список услуг
   */
  abstract query(): Observable<Service[]>;

  /**
   * Получает с сервера данные по выбранной услуге
   *
   * @param id - ID категории
   */
  abstract show(id: number): Observable<Service>;
}
