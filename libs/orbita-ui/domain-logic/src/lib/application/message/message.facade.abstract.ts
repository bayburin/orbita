import { Subscription } from 'rxjs';

export abstract class MessageFacadeAbstract {
  /**
   * Сохраняет комментарий
   *
   * @param ticketId - номер тикета
   * @param message - текст сообщения
   */
  abstract createComment(ticketId: number, message: string): void;

  /**
   * Подключается к каналу 'CommentsChannel'
   *
   * @param ticketId - номер тикета
   */
  abstract connectToCommentsChannel(ticketId: number): Subscription;
}
