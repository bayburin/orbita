import { MessageTypes } from './../models/message.interface';

/**
 * Форма сообщения
 */
export interface MessageForm {
  /**
   * Идентификатор хода работы
   */
  id?: number;

  /**
   * Идентификатор тикета
   */
  claim_id?: number;

  /**
   * Идентификатор работы
   */
  work_id?: number;

  /**
   * Идентификатор пользователя
   */
  sender_id: number;

  /**
   * Тип сообщения: рабочий процесс или комментарий
   */
  type: MessageTypes;

  /**
   * Сообщение
   */
  message: string;
}
