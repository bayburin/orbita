import { Observable } from 'rxjs';

import { ServiceVM } from '../../entities/view-models/service-vm.interface';

export abstract class ServiceFacadeAbstract {
  /**
   * Выбранная категория
   */
  selected$: Observable<ServiceVM>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * загружает выбранную услугу
   */
  abstract loadSelected(): void;
}
