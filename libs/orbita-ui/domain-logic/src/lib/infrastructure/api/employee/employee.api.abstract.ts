import { Observable } from 'rxjs';

import { Employee } from './../../../entities/models/employee/employee.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import { SearchEmployeeKeys } from './../../../entities/search-employee-keys.enum';
import { EmployeeShortServerData } from './../../../entities/server-data/employee-server-data.interface';

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
   * @param key - имя поля
   * @param value - значение
   */
  abstract query(key?: SearchEmployeeKeys, value?: string): Observable<EmployeeShortServerData>;
}
