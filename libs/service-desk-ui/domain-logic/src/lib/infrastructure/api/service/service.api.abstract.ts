import { Observable } from 'rxjs';

import { Service } from '../../../entities/models/service.interface';

export abstract class ServiceApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера данные по выбранной услуге
   *
   * @param id - ID категории
   */
  abstract show(id: number): Observable<Service>;
}
