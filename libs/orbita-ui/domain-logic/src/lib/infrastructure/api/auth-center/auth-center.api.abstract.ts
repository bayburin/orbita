import { Observable } from 'rxjs';

import { Host } from './../../../entities/models/host.interface';
import { HostFilter } from './../../../entities/filter.interface';

export abstract class AuthCenterApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Возвращает найденный по фильтрам хост
   *
   * @param filter - фильтры
   */
  abstract showHost(filters: HostFilter): Observable<Host | []>;

  /**
   * Возвращает список хостов, закрепленных за работником
   *
   * @param tn - табельный номер работника
   */
  abstract showEmployeeHosts(tn: number): Observable<Host[]>;
}
