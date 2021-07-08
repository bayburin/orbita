import { TicketForm } from './ticket-form.interface';
import { WorkForm } from './work-form.interface';

/**
 * Заявка
 */
export interface SdRequestForm extends TicketForm {
  /**
   * ID Услуги
   */
  service_id: number;

  /**
   * Имя услуги
   */
  service_name: string;

  /**
   * ID вида заявки
   */
  ticket_identity: number;

  /**
   * Имя вида заявки
   */
  ticket_name: string;

  /**
   * Оценка качества обслуживания
   */
  rating: number;

  /**
   * Массив работ
   */
  works: WorkForm[];
}
