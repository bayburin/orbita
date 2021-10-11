/**
 * Форма существующего прикрепленного файла
 */
export interface AttachmentViewForm {
  /**
   * Идентификатор прикрепленного файла
   */
  id: number;

  /**
   * Идентификатор тикета
   */
  claim_id: number;

  /**
   * Имя файла
   */
  filename: string;

  /**
   * Флаг удаления файла
   */
  _destroy?: boolean;
}
