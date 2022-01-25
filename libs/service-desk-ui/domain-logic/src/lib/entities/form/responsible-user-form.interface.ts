import { EmployeeShort } from './../models/employee/employee-short.interface';

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
   * Данные об ответственном
   */
  details?: EmployeeShort;

  /**
   * Флаг обозначающий, что запись будет удалена из БД
   */
  _destroy: boolean;
}
