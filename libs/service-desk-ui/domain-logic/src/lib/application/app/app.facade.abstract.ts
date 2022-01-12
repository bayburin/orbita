export abstract class AppFacadeAbstract {
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
