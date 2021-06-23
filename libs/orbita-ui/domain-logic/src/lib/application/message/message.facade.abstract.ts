import { Message } from '../../entities/models/message.interface';

export abstract class MessageFacadeAbstract {
  /**
   * Сохранить новый массив сообщений в хранилище
   *
   * @param messages - список сообщений
   */
  abstract replaceAllMessages(messages: Message[]): void;

  /**
   * Добавить новые или обновить существующие сообщения
   *
   * @param messages - список сообщений
   */
  abstract setMessages(messages: Message[]): void;
}
