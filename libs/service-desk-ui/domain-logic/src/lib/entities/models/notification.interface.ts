/**
 * Тело уведомления
 */
export interface NotificationBody {
  /**
   * Текст сообщения
   */
  readonly message: string;

  /**
   * Идентификатор кейса системы Astraea
   */
  readonly case_id?: number;

  /**
   * Табельный номер (???)
   */
  readonly user_tn?: number;
}

/**
 * Уведомление
 */
export interface Notification {
  /**
   * Идентификатор уведомления
   */
  readonly id: number;

  /**
   * Тип уведомления
   */
  readonly event_type: NotificationTypes;

  /**
   * Табельный номер пользователя, которому предназначается уведомление (???)
   */
  readonly tn: number;

  /**
   * Тело уведомления
   */
  readonly body: NotificationBody;

  /**
   * Дата уведомления
   */
  readonly date: string;
}

/**
 * Всплывающее уведомление
 */
export interface TmpNotification {
  /**
   * Тип уведомления
   */
  readonly event_type: NotificationTypes;
  /**
   * Сообщение
   */
  readonly message: string;
}

/**
 * Типы уведомлений
 */
export enum NotificationTypes {
  BROADCAST = 'broadcast',
  APP = 'app',
  ERROR = 'error',
  INFO = 'info',
}

/**
 * Способы ограничения списка уведомлений
 */
export enum LimitTypes {
  LIMITED = 'limited',
  FULL = 'full',
}
