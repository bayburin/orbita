import { Observable } from 'rxjs';

import { SearchResultTypes } from '../../entities/models/search-result.types';

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
   * @param term - поисковая строка
   */
  abstract search(term: string): void;

  /**
   * Возвращает ссылку на результат поиска
   *
   * @param result - результат поиска
   */
  abstract getLink(result: SearchResultTypes): string;
}
