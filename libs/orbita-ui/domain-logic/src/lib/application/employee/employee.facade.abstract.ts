import { EmployeeShort } from './../../entities/models/employee/employee-short.interface';
import { Observable } from 'rxjs';

import { Employee } from './../../entities/models/employee/employee.interface';
import { SearchEmployeeKeys } from './../../entities/search-employee-keys.enum';

export abstract class EmployeeFacadeAbstract {
  /**
   * Индикатор загрузки
   */
  loadingEmployee$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loadedEmployee$: Observable<boolean>;
  /**
   * Работник, найденный по IdTn
   */
  employee$: Observable<Employee>;
  /**
   * Список работников
   */
  allShort$: Observable<EmployeeShort[]>;

  /**
   * Поиск работников
   *
   * @param key - атрибут поиска
   * @param value - значение
   */
  abstract search(key: SearchEmployeeKeys, value: string): void;
}
