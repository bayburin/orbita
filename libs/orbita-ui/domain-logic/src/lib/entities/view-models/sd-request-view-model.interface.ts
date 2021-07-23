import { MessageViewModel } from './message-view-model.interface';
import { TicketViewModel } from './ticket-view-model.interface';
import { Application } from './../models/application.interface';
import { HistoryViewModel } from './history-view-model.interface';
import { Parameter } from './../models/parameter.interface';

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
   * Событие, произошедшее последним в заявке
   */
  // readonly lastHistory?: HistoryViewModel;

  /**
   * Упорядоченный список событий по всем работам
   */
  readonly histories: HistoryViewModel[];

  /**
   * Упорядоченный список хода работы по всем работам
   */
  readonly workflows: MessageViewModel[];
}
