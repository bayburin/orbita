import { TicketViewModel } from './ticket-view-model.interface';
import { WorkViewModel } from './work-view-model.interface';

/**
 * Интерфейс заявки
 */
export interface SdRequestViewModel extends TicketViewModel {
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
  // readonly parameters: Parameter[];

  /**
   * Массив объектов Work
   */
  readonly works: WorkViewModel[];
}
