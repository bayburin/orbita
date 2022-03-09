/**
 * Интерфейс событий, происходящих в заявке (история заявки)
 */
export interface History {
  /**
   * Идентификатор истории
   */
  readonly id: number;

  /**
   * Идентификатор работы по заявке
   */
  readonly work_id: number;

  /**
   * Идентификатор пользователя, совершившего действие
   */
  readonly user_id: number;

  /**
   * Идентификатор вида действия
   */
  readonly event_type_id: number;

  /**
   * Текстовое описание произошедшего события
   */
  readonly action: string;

  /**
   * Данные о пользователе, который вызвал событие, на момент фиксации события
   */
  readonly user_info: HistoryUserInfo;

  /**
   * Время события
   */
  readonly created_at: string;
}

/**
 * Данные о пользователе, который вызвал событие, на момент фиксации события
 */
export interface HistoryUserInfo {
  /**
   * Табельный номер
   */
  readonly tn: number;

  /**
   * ФИО
   */
  readonly fio: string;

  /**
   * email
   */
  readonly email: string;

  /**
   * IdTn пользователя
   */
  readonly id_tn: number;

  /**
   * Доменная учетная запись
   */
  readonly login: string;

  /**
   * Рабочий телефон
   */
  readonly work_tel: string;
}
