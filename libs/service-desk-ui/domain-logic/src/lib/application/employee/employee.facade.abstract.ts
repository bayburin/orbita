import { Observable } from 'rxjs';

import { EmployeeShort } from '../../entities/models/employee/employee-short.interface';

export abstract class EmployeeFacadeAbstract {
  /**
   * Список найденных работников
   */
  searched$: Observable<EmployeeShort[]>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Поиск работника по ключу
   */
  abstract search(key: string, value: string): void;
}
