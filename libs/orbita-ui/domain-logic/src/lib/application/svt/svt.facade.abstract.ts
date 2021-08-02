import { Observable } from 'rxjs';

import { SvtItem } from './../../entities/models/svt/svt-item.interface';

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
  loadItems$: Observable<void | SvtItem[]>;
  /**
   * Список ВТ
   */
  allItems$: Observable<SvtItem[]>;
}
