import { Observable } from 'rxjs';

import { CategoryVM } from '../../entities/view-models/category-vm.interface';
import { ServiceVM } from '../../entities/view-models/service-vm.interface';

export abstract class HomeFacadeAbstract {
  /**
   * Индикатор, идет ли загрузка данных для дашбоарда в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные для дашбоарда
   */
  loaded$: Observable<boolean>;
  /**
   * Список категорий для дашбоарда
   */
  categories$: Observable<CategoryVM[]>;
  /**
   * Список услуг для дашбоарда
   */
  services$: Observable<ServiceVM[]>;

  /**
   * Загружает данные для дашбоарда
   */
  abstract loadHome(): void;
}
