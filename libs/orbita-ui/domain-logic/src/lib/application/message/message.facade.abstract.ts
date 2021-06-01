import { Message } from '../../entities/models/message.interface';

export abstract class MessageFacadeAbstract {
  /**
   * Сохранить новый массив сообщений в хранилище
   */
  abstract setMessages(messages: Message[]): void;
}
