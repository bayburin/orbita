import { Observable } from 'rxjs';

export abstract class AppFacadeAbstract {
  /**
   * Индикатор, загружены данные
   */
  loaded$: Observable<boolean>;

  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;

  /**
   * Ошибка, возникшая при загрузке приложения
   */
  error$: Observable<string>;

  /**
   * Инициализирует данные, необходимые для работы приложения
   */
  abstract init(): void;
}
