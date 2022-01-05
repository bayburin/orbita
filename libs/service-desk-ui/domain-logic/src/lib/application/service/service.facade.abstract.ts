import { Observable } from 'rxjs';

import { Service } from '../../entities/models/service.interface';
import { ServiceVM } from '../../entities/view-models/service-vm.interface';

export abstract class ServiceFacadeAbstract {
  /**
   * Выбранная модель услуги
   */
  entity$: Observable<Service>;
  /**
   * Выбранная услуга
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
   * Список моделей
   */
  entities$: Observable<Service[]>;

  /**
   * Загружает выбранную услугу
   */
  abstract loadSelected(): void;
}
