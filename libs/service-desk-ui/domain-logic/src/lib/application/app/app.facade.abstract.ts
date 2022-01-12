export abstract class AppFacadeAbstract {
  /**
   * Устанавливает флаг, который говорит об обнаружении AdBlock
   *
   * @param value - флаг
   */
  abstract detectAdBlock(value: boolean): void;
}
