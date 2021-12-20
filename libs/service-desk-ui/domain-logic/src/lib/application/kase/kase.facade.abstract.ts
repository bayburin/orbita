import { Observable } from 'rxjs';
import { KaseStatus } from '../../entities/model/kase-status.interface';

import { Kase } from './../../entities/model/kase.interface';

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
  statuses$: Observable<KaseStatus[]>;

  /**
   * Инициализирует начальную загрузку заявок и других данных
   */
  abstract init(): void;

  /**
   * Загружает заявки
   */
  abstract loadAll(): void;

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
}
