import { ParameterViewModel } from './parameter-view-model.interface';
import { MessageViewModel } from './message-view-model.interface';
import { TicketViewModel } from './ticket-view-model.interface';
import { HistoryViewModel } from './history-view-model.interface';

/**
 * Заявка
 */
export interface SdRequestViewModel extends TicketViewModel {
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
   * Объект параметров ParameterViewModel
   */
  readonly parameter?: ParameterViewModel;

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
