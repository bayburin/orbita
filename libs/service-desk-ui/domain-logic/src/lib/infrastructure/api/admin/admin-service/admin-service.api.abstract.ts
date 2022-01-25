import { Observable } from 'rxjs';

import { Service } from '../../../../entities/models/service.interface';
import { ServiceForm } from '../../../../entities/form/service-form.interface';
import { ServiceOverviewVM } from '../../../../entities/view-models/service-overview-vm.interface';

export abstract class AdminServiceApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список услуг
   */
  abstract query(): Observable<ServiceOverviewVM[]>;

  /**
   * Получает с сервера данные по выбранной услуге
   *
   * @param id - ID категории
   */
  abstract show(id: number): Observable<ServiceOverviewVM>;

  /**
   * Сохраняет услугу
   *
   * @param formData - данные о категории.
   */
  abstract save(formData: ServiceForm): Observable<ServiceOverviewVM>;

  /**
   * Обновляет услугу
   *
   * @param id - id услуги
   * @param formData - новые данные
   */
  abstract update(id: number, formData: ServiceForm): Observable<ServiceOverviewVM>;

  /**
   * Удаляет запись
   *
   * @param id - id записи.
   */
  abstract destroy(id: number): Observable<Service>;
}
