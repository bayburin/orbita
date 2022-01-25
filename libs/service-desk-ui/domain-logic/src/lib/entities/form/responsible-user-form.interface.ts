import { ResponseableTypes } from './../models/responsible-user.interface';

/**
 * Форма ответственного
 */
export interface ResponsibleUserForm {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Табельный номер
   */
  tn: number;

  /**
   * Флаг обозначающий, что запись будет удалена из БД
   */
  _destroy: boolean;
}
