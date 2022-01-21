import { Observable } from 'rxjs';

import { ServiceOverviewVM } from './../../../entities/view-models/service-overview-vm.interface';

export abstract class AdminServiceFacadeAbstract {
  /**
   * Список услуг
   */
  all$: Observable<ServiceOverviewVM[]>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Загружает список услуг
   */
  abstract loadAll(): void;
}
