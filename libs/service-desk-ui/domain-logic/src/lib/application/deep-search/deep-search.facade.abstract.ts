import { Observable } from 'rxjs';

import { DeepSearchResultTypes } from '../../entities/models/search-result.types';

export abstract class DeepSearchFacadeAbstract {
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
  result$: Observable<DeepSearchResultTypes[]>;

  /**
   * Производит поиск по всем категориям, услугам и тикетам
   */
  abstract search(): void;
}
