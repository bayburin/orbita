import { Observable } from 'rxjs';

import { ServiceOverviewVM } from '../../../entities/view-models/service-overview-vm.interface';

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
  abstract show(id: number): Observable<ServiceOverviewVM>;
}
