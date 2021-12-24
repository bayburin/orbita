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
}

export enum ResponseableTypes {
  SERVICE = 'Service',
  TICKET = 'Ticket',
}
