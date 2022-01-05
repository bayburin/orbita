import { Notification, NotificationTypes, TmpNotification } from '../../entities/models/notification.interface';

/**
 * Фабрика по созданию сообщений
 */
export class TmpNotificationFactory {
  /**
   * Создает временное уведомление из объекта уведомления (Notification)
   *
   * @param notification - id отправителя
   */
  static createFromNotification(notification: Notification): TmpNotification {
    return {
      event_type: notification.event_type,
      message: notification.body.message,
    };
  }

  /**
   * Создает временное уведомление из текстового сообщения
   *
   * @param message - текст сообщения
   * @param eventType - тип сообщения
   */
  static createFromMessage(message: string, eventType: NotificationTypes = NotificationTypes.INFO): TmpNotification {
    return {
      event_type: eventType,
      message,
    };
  }
}
