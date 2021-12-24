import { Observable } from 'rxjs';

import { Category } from '../../../entities/models/category.interface';

export abstract class CategoryApiAbstract {
  /**
   * Адрес сервера
   */
  readonly api: string;

  /**
   * Получает с сервера список категорий
   */
  abstract query(): Observable<Category[]>;

  /**
   * Получает с сервера данные по выбранной категории
   *
   * @param id - ID категории
   */
  abstract show(id: number): Observable<Category>;
}
