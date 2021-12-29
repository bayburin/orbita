import { Observable } from 'rxjs';

import { KaseViewForm } from './../../entities/form/kase-view-form.interface';
import { Filter } from '../../entities/filter.interface';
import { Kase } from '../../entities/models/kase.interface';
import { SvtItem } from '../../entities/models/svt/svt-item.interface';

export abstract class KaseFacadeAbstract {
  // ========== Список заявок ==========

  /**
   * Список заявок
   */
  all$: Observable<Kase[]>;
  /**
   * Индикатор начальной загрузки
   */
  initLoading$: Observable<boolean>;
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Статусы заявок
   */
  statuses$: Observable<Filter[]>;
  /**
   * Id выбранного статуса
   */
  selectedStatusId$: Observable<number>;
  /**
   * Показывает, имеется ли у пользователя хотя бы одна заявка
   */
  isAnyKase$: Observable<boolean>;

  // ========== Форма новой заявки ==========

  /**
   * Данные формы
   */
  formEntity$: Observable<KaseViewForm>;

  /**
   * Список ВТ, доступной пользователю
   */
  formSvtItems$: Observable<SvtItem[]>;

  /**
   * Индикатор загрузки параметров формы
   */
  formLoadingParams$: Observable<boolean>;

  /**
   * Данные об ошибке, произошедшей во время загрузки параметров
   */
  formErrorParams$: Observable<any>;

  /**
   * Инициализирует начальную загрузку заявок и других данных
   */
  abstract init(): void;

  /**
   * Отменяет заявку
   *
   * @param caseId - номер заявки
   */
  abstract revoke(caseId: number): void;

  /**
   * Оценивает качество обслуживания
   *
   * @param caseId - номер заявки
   * @param rating - выбранная оценка качества обслуживания
   */
  abstract vote(caseId: number, rating: number): void;

  /**
   * Установить новый статус и загрузить соответствующие данные
   *
   * @param selectedStatusId - id выбранного статуса
   */
  abstract setSelectedStatusId(selectedStatusId: number): void;

  /**
   * Очищает список услуг, по которым фильтруются заявки
   */
  abstract clearSelectedServices(): void;

  /**
   * Инициализирует новую форму заявки
   */
  abstract initNewForm(): void;

  /**
   * Изменить данные формы
   *
   * @param formData - данные формы
   */
  abstract changeForm(formData: KaseViewForm): void;

  /**
   * Сохраняет заявку
   */
  abstract saveForm(): void;
}
