import { MessageTypes } from './../../entities/models/message.interface';
import { MessageForm } from './../../entities/forms/message-form.interface';

/**
 * Фабрика по созданию сообщений
 */
export class MessageFactory {
  /**
   * Создает сообщение
   *
   * @param senderId - id отправителя
   * @param type - тип сообщения: workflow, comment
   * @param message - сообщение
   */
  static createMessage(senderId: number, type: MessageTypes, message: string): MessageForm {
    return {
      sender_id: senderId,
      type,
      message,
    };
  }
}
