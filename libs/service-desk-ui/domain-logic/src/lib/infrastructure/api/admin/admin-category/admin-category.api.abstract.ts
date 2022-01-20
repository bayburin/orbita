import { Observable } from 'rxjs';

import { Category } from '../../../../entities/models/category.interface';

export abstract class AdminCategoryApiAbstract {
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

  /**
   * Сохраняет категорию
   *
   * @param formData - данные о категории.
   */
  abstract save(formData: Category): Observable<Category>;

  /**
   * Обновляет категорию
   *
   * @param id - id категории
   * @param formData - новые данные
   */
  abstract update(id: number, formData: Category): Observable<Category>;

  /**
   * Удаляет запись
   *
   * @param id - id записи.
   */
  abstract destroy(id: number): Observable<Category>;
}
