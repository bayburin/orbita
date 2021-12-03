import { Observable } from 'rxjs';

import { ServiceVM } from './../../entities/view-models/service-vm.interface';

export abstract class ServiceFacadeAbstract {
  /**
   * Список всех услуг
   */
  all$: Observable<ServiceVM[]>;
}
