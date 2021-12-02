import { Observable } from 'rxjs';

import { Category } from './../../entities/model/category.interface';

export abstract class CategoryFacadeAbstract {
  /**
   * Общее число категорий
   */
  all$: Observable<Category[]>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Загружает список категорий
   */
  abstract loadAll(): void;
}
