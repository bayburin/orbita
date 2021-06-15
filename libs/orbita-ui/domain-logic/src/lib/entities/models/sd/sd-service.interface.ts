/**
 * Интерфейс услуги портала техподдержки
 */
export interface SdService {
  /**
   * ID услуги
   */
  readonly id: number;

  /**
   * Имя услуги
   */
  readonly name: string;
}
