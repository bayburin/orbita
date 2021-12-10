import { Observable } from 'rxjs';

import { Home } from '../../../entities/server-data/home.interface';
import { SearchResult } from '../../../entities/server-data/search-result.interface';

export abstract class HomeApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Отправляет запрос для получения данных для дашбоарда
   */
  abstract loadHomeData(): Observable<Home>;

  /**
   * Отправляет запрос для поиска данных
   *
   * @param searchValue - поисковая строка
   */
  abstract search(searchValue: string): Observable<SearchResult>;
}
