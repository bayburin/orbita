import { Observable } from 'rxjs';

import { SearchResultTypes } from '../../entities/models/search-result.types';
import { Filter } from '../../entities/filter.interface';
import { DeepSearchFilterTypes } from './../../entities/filter.interface';

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
  result$: Observable<SearchResultTypes[]>;
  /**
   * Типы результатов поиска
   */
  resultTypes$: Observable<Filter[]>;
  /**
   * ID выбранного типа результата поиска
   */
  selectedResultTypeId$: Observable<string>;
  /**
   * Показывает, имеется ли хотя бы один результат поиска
   */
  isAnyResult$: Observable<boolean>;

  /**
   * Производит поиск по всем категориям, услугам и тикетам
   */
  abstract search(): void;

  /**
   * Запомнить новый фильтр для результатов поиска
   *
   * @param id - id выбранного фильтра
   */
  abstract setSelectedResultTypeId(selectedResultTypeId: DeepSearchFilterTypes): void;
}
