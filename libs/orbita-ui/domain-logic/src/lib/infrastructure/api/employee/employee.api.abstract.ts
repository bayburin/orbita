import { Observable } from 'rxjs';

import { Employee } from './../../../entities/models/employee/employee.interface';
import { EmployeeShortServerData } from './../../../entities/server-data/employee-server-data.interface';
import { PrimeFilter } from '../../../entities/prime-filter.interface';

export abstract class EmployeeApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Загружает с сервера указанного пользователя
   *
   * @param idTn - IdTn пользователя
   */
  abstract show(idTn: number): Observable<Employee>;

  /**
   * Получает список работников, отфильтрованный по указанным параметрам
   *
   * @param filters - фильтры
   */
  abstract query(filters: PrimeFilter): Observable<EmployeeShortServerData>;
}
