import { EmployeeShort } from './employee/employee-short.interface';

/**
 * Ответственный
 */
export interface ResponsibleUser {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Наименование сущности
   */
  readonly responseable_type: ResponseableTypes;

  /**
   * Идентификатор привязанной сущности
   */
  readonly responseable_id: number;

  /**
   * Табельный номер
   */
  readonly tn: number;

  /**
   * Данные об ответственном
   */
  readonly details?: EmployeeShort;
}

export enum ResponseableTypes {
  SERVICE = 'Service',
  TICKET = 'Ticket',
}
