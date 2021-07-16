import { TicketViewForm } from './ticket-view-form.interface';

/**
 * Форма заявки, которую заполняет пользователь
 */
export interface SdRequestViewForm extends TicketViewForm {
  /**
   * ID Услуги
   */
  service_id?: number;

  /**
   * Имя услуги
   */
  service_name?: string;

  /**
   * ID вида заявки
   */
  ticket_identity?: number;

  /**
   * Имя вида заявки
   */
  ticket_name?: string;

  /**
   * Оценка качества обслуживания
   */
  rating?: number;

  /**
   * Список исполнителей
   */
  workers: number[];

  /**
   * Сообщение вида "ход работы"
   */
  workflow: string;
}
