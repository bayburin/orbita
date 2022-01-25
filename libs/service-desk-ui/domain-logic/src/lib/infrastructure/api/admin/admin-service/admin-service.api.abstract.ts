import { Observable } from 'rxjs';

import { Service } from '../../../../entities/models/service.interface';
import { ServiceForm } from '../../../../entities/form/service-form.interface';

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

  /**
   * Сохраняет услугу
   *
   * @param formData - данные о категории.
   */
  abstract save(formData: ServiceForm): Observable<Service>;

  /**
   * Обновляет услугу
   *
   * @param id - id услуги
   * @param formData - новые данные
   */
  abstract update(id: number, formData: ServiceForm): Observable<Service>;

  /**
   * Удаляет запись
   *
   * @param id - id записи.
   */
  abstract destroy(id: number): Observable<Service>;
}
