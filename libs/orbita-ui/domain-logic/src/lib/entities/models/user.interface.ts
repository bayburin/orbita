/**
 * Интерфейс пользователя
 */
export interface User {
  /**
   * Идентификатор пользователя
   */
  readonly id: number;

  /**
   * Идентификатор роли пользователя
   */
  readonly role_id: number;

  /**
   * Идентификатор группы пользователя
   */
  readonly group_id: number;

  /**
   * Табельный номер
   */
  readonly tn: number;

  /**
   * Доменная учетная запись
   */
  readonly login: string;

  /**
   * IdTn пользователя
   */
  readonly id_tn: number;

  /**
   * ФИО
   */
  readonly fio: string;

  /**
   * Рабочий телефон
   */
  readonly work_tel: string;

  /**
   * Сотовый телефон
   */
  readonly mobile_tel: string;

  /**
   * email
   */
  readonly email: string;

  /**
   * Флаг, показывающий в отпуске пользователь или нет
   */
  readonly is_vacation: boolean;

  /**
   * Флаг, показывающий, является ли пользователь "исполнителем по умолчанию"
   */
  readonly is_default_worker: boolean;

  /**
   * Флаг, показывающий, является ли пользователь текущим
   */
  readonly isCurrentUser?: boolean;
}
