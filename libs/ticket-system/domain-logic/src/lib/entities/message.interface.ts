import { User } from './user.interface';

/**
 * Типы сообщений
 */
export type MessageTypes = 'workflow' | 'message';

/**
 * Интерфейс сообщений
 */
export interface Message {
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

  /**
   * Объект User - отправитель сообщения
   */
  readonly sender: User;
}
