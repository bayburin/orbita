import { Observable } from 'rxjs';

import { SearchResultTypes } from './../../entities/model/search-result.types';

export abstract class SearchFacadeAbstract {
  /**
   * Индикатор, идет ли поиск в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Результаты поиска
   */
  result$: Observable<SearchResultTypes[]>;

  /**
   * Производит поиск по всем категориям, услугам и тикетам
   *
   * @param term
   */
  abstract search(term: string): void;
}
