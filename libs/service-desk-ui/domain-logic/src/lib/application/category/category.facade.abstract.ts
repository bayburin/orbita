import { Observable } from 'rxjs';

import { CategoryVM } from './../../entities/view-models/category-vm.interface';

export abstract class CategoryFacadeAbstract {
  /**
   * Список всех категорий
   */
  all$: Observable<CategoryVM[]>;
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

  /**
   * загружает выбранную категорию
   */
  abstract loadSelected(): void;
}
