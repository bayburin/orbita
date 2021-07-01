import { Observable } from 'rxjs';

import { Parameter } from './../../entities/models/parameter.interface';

export abstract class ParameterFacadeAbstract {
  /**
   * Индикатор загрузки оста
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные по хосту
   */
  loaded$: Observable<boolean>;
  /**
   * Список параметров
   */
  all$: Observable<Parameter[]>;
}
