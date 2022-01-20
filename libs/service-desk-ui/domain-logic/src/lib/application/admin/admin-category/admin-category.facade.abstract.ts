import { Observable } from 'rxjs';

import { Category } from '../../../entities/models/category.interface';

export abstract class AdminCategoryFacadeAbstract {
  /**
   * Список категорий
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
   * Список id тех категорий, которые сейчас обрабатываются
   */
  loadingIds$: Observable<number[]>;

  // ========== Форма рекомендаций для пользователя ==========

  /**
   * Данные формы
   */
  formData$: Observable<Category>;
  /**
   * Индикатор загрузки формы
   */
  formLoading$: Observable<boolean>;
  /**
   * Индикатор, показывать ли форму
   */
  formDisplay$: Observable<boolean>;
  /**
   * Данные об ошибке, произошедшей во время сохранения формы
   */
  formError$: Observable<any>;

  /**
   * Загружает список категорий
   */
  abstract loadAll(): void;

  /**
   * Выбрать категорию для редактирования
   *
   * @param id - id выбранной записи
   */
  abstract edit(id: number): void;

  /**
   * Инициализирует новую форму заявки
   */
  abstract initForm(): void;

  /**
   * Закрывает модальное окно формы
   */
  abstract closeForm(): void;

  /**
   * Изменить данные формы
   *
   * @param formData - данные формы
   */
  abstract changeForm(formData: Category): void;

  /**
   * Сохраняет заявку
   */
  abstract saveForm(): void;

  /**
   * Удаляет запись
   *
   * @param id - id записи
   */
  abstract destroy(id: number): void;
}
