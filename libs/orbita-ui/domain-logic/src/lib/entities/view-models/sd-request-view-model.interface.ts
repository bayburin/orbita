import { TicketViewModel } from './ticket-view-model.interface';
import { WorkViewModel } from './work-view-model.interface';
import { Application } from './../models/application.interface';

/**
 * Интерфейс заявки
 */
export interface SdRequestViewModel extends TicketViewModel {
  /**
   * ID заявки во внешней системе.
   */
  readonly integration_id: number;

  /**
   * ID приложения, с которого пришла заявка.
   */
  readonly application_id: number;

  /**
   * Приложение создавшнее/обрабатывающее заявку
   */
  readonly application: Application;

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

  /**
   * Идентификатор события, произошедшего последним в заявке
   */
  readonly lastHistoryId?: number;
}
