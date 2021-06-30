import { Observable } from 'rxjs';

import { Employee } from './../../../entities/models/employee/employee.interface';

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
}
