import { Observable } from 'rxjs';

import { Employee } from './../../entities/models/employee/employee.interface';

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
}
