/**
 * Прикрепленный файл
 */
export interface Attachent {
  /**
   * Идентификатор прикрепленного файла
   */
  readonly id: number;

  /**
   * Идентификатор тикета
   */
  readonly claim_id: number;

  /**
   * Имя файла
   */
  readonly attachment: string;
}
