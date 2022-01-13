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
  error$: Observable<any>;
  /**
   * Серверное время
   */
  serverDate$: Observable<string>;

  /**
   * Инициализирует данные, необходимые для работы приложения
   */
  abstract init(): void;

  /**
   * Устанавливает флаг, который говорит об обнаружении AdBlock
   *
   * @param value - флаг
   */
  abstract detectAdBlock(value: boolean): void;

  /**
   * Инициирует проверку хэша приложения через равные промежутки времени
   */
  abstract initVersionChecking(): void;
}
