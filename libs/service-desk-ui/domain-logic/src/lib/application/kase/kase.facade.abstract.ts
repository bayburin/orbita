import { Observable } from 'rxjs';
import { Filter } from '../../entities/filter.interface';

import { Kase } from '../../entities/models/kase.interface';

export abstract class KaseFacadeAbstract {
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
}
