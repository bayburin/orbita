import { Observable } from 'rxjs';

import { Dashboard } from './../../../entities/server-data/dashboard.interface';
import { SearchResult } from '../../../entities/server-data/search-result.interface';

export abstract class DashboardApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Отправляет запрос для получения данных для дашбоарда
   */
  abstract loadDashboardData(): Observable<Dashboard>;

  /**
   * Отправляет запрос для поиска данных
   *
   * @param searchValue - поисковая строка
   */
  abstract search(searchValue: string): Observable<SearchResult>;
}
