import { Observable } from 'rxjs';

import { SvtItem } from './../../entities/models/svt/svt-item.interface';
import { SvtFilters } from './../../entities/filter.interface';

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
   * Загружает список ВТ
   */
  loadForFormItems$: Observable<void | SvtItem[]>;
  /**
   * Список ВТ
   */
  allForFormItems$: Observable<SvtItem[]>;

  /**
   * Загружает список ВТ для формы создания заявки
   */
  abstract loadItemsForForm(filters: SvtFilters): void;

  /**
   * Удаляет всю ВТ из хранилища
   */
  abstract removeAllItems(): void;
}
