/**
 * Прикрепленный файл
 */
export interface Attachment {
  /**
   * Идентификатор прикрепленного файла
   */
  readonly id: number;

  /**
   * Идентификатор тикета
   */
  readonly claim_id: number;

  /**
   * Содержит прямую ссылку на файл
   */
  readonly attachment: { url: string };

  /**
   * Имя файла
   */
  readonly filename: string;
}
