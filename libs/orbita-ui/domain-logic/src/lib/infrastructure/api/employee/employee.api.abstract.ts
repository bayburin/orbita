import { Observable } from 'rxjs';

import { EmployeeServerData } from './../../../entities/server-data/employee-server-data.interface';

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
  abstract show(idTn: number): Observable<EmployeeServerData>;
}
