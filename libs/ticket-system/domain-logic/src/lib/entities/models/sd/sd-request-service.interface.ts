/**
 * Интерфейс услуги портала техподдержки
 */
export interface SdRequestService {
  /**
   * ID услуги
   */
  readonly id: number;

  /**
   * Имя услуги
   */
  readonly name: string;
}
