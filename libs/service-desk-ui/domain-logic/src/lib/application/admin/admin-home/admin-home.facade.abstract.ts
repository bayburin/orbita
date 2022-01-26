import { Observable } from 'rxjs';

export abstract class AdminHomeFacadeAbstract {
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Загружает начаьлные данные
   */
  abstract init(): void;
}
