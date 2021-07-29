import { EmployeeShort } from './../../entities/models/employee/employee-short.interface';
import { Observable } from 'rxjs';

import { Employee } from './../../entities/models/employee/employee.interface';
import { EmployeeFilters } from './../../entities/models/employee/employee-filters.enum';

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
   * Индикатор, загружены ли данные
   */
  loadedAllShort$: Observable<boolean>;
  /**
   * Число найденных записей
   */
  totalCountShort$: Observable<number>;

  /**
   * Поиск работников
   *
   * @param key - атрибут поиска
   * @param value - значение
   */
  abstract search(key: EmployeeFilters, value: string): void;
}
