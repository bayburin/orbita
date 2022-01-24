import { Observable } from 'rxjs';

import { ServiceOverviewVM } from './../../../entities/view-models/service-overview-vm.interface';
import { Service } from '../../../entities/models/service.interface';

export abstract class AdminServiceFacadeAbstract {
  /**
   * Список услуг
   */
  all$: Observable<ServiceOverviewVM[]>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Список id тех услуг, которые сейчас обрабатываются
   */
  loadingIds$: Observable<number[]>;

  // ========== Форма рекомендаций для пользователя ==========

  /**
   * Данные формы
   */
  formData$: Observable<Service>;
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
   * Загружает список услуг
   */
  abstract loadAll(): void;

  /**
   * Инициализирует новую форму услуги
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
  abstract changeForm(formData: Service): void;

  /**
   * Сохраняет заявку
   */
  abstract saveForm(): void;
}
