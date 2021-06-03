import { AccessToken } from './access-token.interface';
import { Group } from './../group.interface';

/**
 * Интерфейс пользователя, который залогинен в системе
 */
export interface CurrentUser {
  /**
   * Идентификатор пользователя
   */
  readonly id: number;

  /**
   * Токен пользователя, полученный у ЦА
   */
  readonly auth_center_token: AccessToken;

  /**
   * Идентификатор роли пользователя
   */
  readonly role_id: number;

  /**
   * Идентификатор группы пользователя
   */
  readonly group_id: number;

  /**
   * Группа, к которой относится пользователь
   */
  readonly group: Group;

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
}
