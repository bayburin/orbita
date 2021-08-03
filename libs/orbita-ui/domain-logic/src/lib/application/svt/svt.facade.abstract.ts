import { Observable } from 'rxjs';

import { SvtItem } from './../../entities/models/svt/svt-item.interface';
import { SvtFilters } from './../../entities/models/svt/svt-filters.interface';

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
   * Выбранная ВТ
   */
  selectedItem$: Observable<SvtItem>;
  /**
   * Загружает список ВТ
   */
  loadAllItems$: Observable<void | SvtItem[]>;
  /**
   * Список ВТ
   */
  allItems$: Observable<SvtItem[]>;

  /**
   * Загружает список ВТ для формы создания заявки
   */
  abstract loadItemsForForm(filters: SvtFilters): void;

  /**
   * Удаляет всю ВТ из хранилища
   */
  abstract removeAllItems(): void;
}
