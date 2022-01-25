import { Observable } from 'rxjs';

import { EmployeeShort } from '../../../entities/models/employee/employee-short.interface';

export abstract class EmployeeApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера информацию о работниках по указанному списку табельных
   *
   * @param tns - список табельных номеров
   */
  abstract queryByTns(tns: number[]): Observable<EmployeeShort[]>;

  /**
   * Поиск работников по указанному ключу
   *
   * @param key - ключ
   * @param value - значение
   */
  abstract search(key: string, value: string): Observable<EmployeeShort[]>;
}
