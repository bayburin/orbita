import { User } from './../models/user.interface';
import { MessageTypes } from './../models/message.interface';

/**
 * Интерфейс сообщений
 */
export interface MessageViewModel {
  /**
   * Идентификатор сообщения
   */
  readonly id: number;

  /**
   * Идентификатор тикета
   */
  readonly claim_id: number;

  /**
   * Идентификатор работы
   */
  readonly work_id: number;

  /**
   * Идентификатор отправителя
   */
  readonly sender_id: number;

  /**
   * Отправитель сообщения
   */
  readonly sender: User;

  /**
   * Тип сообщения: рабочий процесс или комментарий
   */
  readonly type: MessageTypes;

  /**
   * Сообщение
   */
  readonly message: string;

  /**
   * Время отправки
   */
  readonly created_at: string;
}
