/**
 * Форма существующего прикрепленного файла, отправляемая на сервер
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
   * Флаг удаления файла
   */
  _destroy?: boolean;
}
