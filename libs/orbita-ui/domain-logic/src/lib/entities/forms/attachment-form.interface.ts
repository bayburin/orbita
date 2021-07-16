/**
 * Форма существующего прикрепленного файла
 */
export interface AttachmentForm {
  /**
   * Идентификатор прикрепленного файла
   */
  id: number;

  /**
   * Идентификатор тикета
   */
  claim_id: number;

  /**
   * Загружаемый файл
   */
  attachment: string;

  /**
   * Флаг удаления файла
   */
  _destroy?: boolean;
}
