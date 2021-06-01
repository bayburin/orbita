/**
 * Интерфейс параметров заявки
 */
export interface Parameter {
  /**
   * Идентификатор параметра
   */
  readonly id: number;

  /**
   * Имя параметра
   */
  readonly name: string;

  /**
   * Значение параметра
   */
  readonly value: string;
}
