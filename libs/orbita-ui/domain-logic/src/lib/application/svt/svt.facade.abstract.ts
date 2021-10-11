import { Observable } from 'rxjs';

import { SvtItem } from './../../entities/models/svt/svt-item.interface';
import { SvtFilters } from './../../entities/filter.interface';
import { PrimeFilter } from './../../entities/prime-filter.interface';

export abstract class SvtFacadeAbstract {
  /**
   * Индикатор загрузки ВТ
   */
  loadingItem$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные по ВТ
   */
  loadedItem$: Observable<boolean>;
  /**
   * Список ВТ
   */
  allItems$: Observable<SvtItem[]>;
  /**
   * Выбранная ВТ
   */
  selectedItem$: Observable<SvtItem>;
  /**
   * Список ВТ
   */
  allForFormItems$: Observable<SvtItem[]>;

  /**
   * Поиск ВТ
   *
   * @param filters - атрибуты поиска
   */
  abstract searchSvtItems(filters: PrimeFilter): void;

  /**
   * Загружает список ВТ для формы создания заявки
   */
  abstract loadItemsForForm(filters: SvtFilters): void;

  /**
   * Удаляет всю ВТ из хранилища
   */
  abstract removeAllItems(): void;
}
