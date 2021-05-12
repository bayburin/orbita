import { Ticket } from './ticket.interface';
import { Parameter } from './parameter.interface';

/**
 * Интерфейс заявки
 */
export interface SdRequest extends Ticket {
  /**
   * ID (номер) заявки во внешней системе.
   */
  readonly integration_id :number;

  /**
   * Имя внешнего приложения, с которого пришла заявка.
   */
  readonly application_name: string;

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
   * Массив объектов Parameter
   */
  readonly parameters: Parameter[];
}
