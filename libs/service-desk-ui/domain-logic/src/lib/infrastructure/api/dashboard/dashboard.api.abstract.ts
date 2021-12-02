import { Observable } from 'rxjs';

import { Dashboard } from './../../../entities/server-data/dashboard.interface';

export abstract class DashboardApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера данные для дашбоарда
   */
  abstract loadDashboardData(): Observable<Dashboard>;
}
