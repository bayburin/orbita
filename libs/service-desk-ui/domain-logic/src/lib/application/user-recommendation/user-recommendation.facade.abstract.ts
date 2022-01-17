import { Observable } from 'rxjs';

import { UserRecommendation } from '../../entities/models/user-recommendation.interface';
import { UserRecommendationViewForm } from '../../entities/form/user-recommendation-view-form.interface';

export abstract class UserRecommendationFacadeAbstract {
  /**
   * Список всех рекомендаций
   */
  all$: Observable<UserRecommendation[]>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Индикатор, идет ли загрузка выбранной записи в данный момент
   */
  selectedLoading$: Observable<boolean>;

  // ========== Форма рекомендаций для пользователя ==========

  /**
   * Данные формы
   */
  formData$: Observable<UserRecommendationViewForm>;
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
   * Загружает список рекомендаций
   */
  abstract loadAll(): void;

  /**
   * Выбрать запись для редактирования
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
  abstract changeForm(formData: UserRecommendationViewForm): void;

  /**
   * Сохраняет заявку
   */
  abstract saveForm(): void;
}
