import { Service } from './service.interface';
import { Ticket } from './ticket.interface';

/**
 * Заявка системы Astraea
 */
export interface Kase {
  /**
   * Номер заявки в Astraea
   */
  readonly case_id: number;

  /**
   * Идентификатор услуги
   */
  readonly service_id: number;

  /**
   * Услуга
   */
  readonly service: Service;

  /**
   * Идентификатор тикета
   */
  readonly ticket_id: number;

  /**
   * Тикет
   */
  readonly ticket: Ticket;

  /**
   * Табельный пользователя
   */
  readonly user_tn: number;

  /**
   * Идентификатор пользователя
   */
  readonly id_tn: number;

  /**
   * Отдел + фио
   */
  readonly user_info: string;

  /**
   * Инвентарный
   */
  readonly host_id: string;

  /**
   * Штрих-код
   */
  readonly barcode: number;

  /**
   * Описание
   */
  readonly desc: string;

  /**
   * Телефон
   */
  readonly phone: string;

  /**
   * email
   */
  readonly email: string;

  /**
   * Мобильный
   */
  readonly mobile: string;

  /**
   * Идентификатор
   */
  readonly status_id: number;

  /**
   * Статус
   */
  readonly status: string;

  /**
   * Временные отметки заявки
   */
  readonly runtime: Runtime;

  /**
   * Качество обслуживания
   */
  readonly rating: number;
}

/**
 * Временные отметки заявки
 */
interface Runtime {
  /**
   * Дата создания
   */
  readonly starttime: string;

  /**
   * Дата закрытия
   */
  readonly endtime: string;

  /**
   * Дата контроля
   */
  readonly time: string;

  /**
   * Полная дата начала и окончания жизни заявки в виде строки
   */
  readonly to_s: string;
}
