import { Ticket } from './ticket.interface';

/**
 * Интерфейс заявки
 */
export interface SdRequest extends Ticket {
  /**
   * ID заявки во внешней системе.
   */
  readonly integration_id: number;

  /**
   * ID приложения, с которого пришла заявка.
   */
  readonly application_id: number;

  /**
   * ID Услуги
   */
  readonly service_id: number;

  /**
   * Имя услуги
   */
  readonly service_name: string;

  /**
   * ID вида заявки
   */
  readonly ticket_identity: number;

  /**
   * Имя вида заявки
   */
  readonly ticket_name: string;

  /**
   * Оценка качества обслуживания
   */
  readonly rating: number;

  /**
   * Массив идентификаторов Parameter
   */
  readonly parameters: number[];
}
