import { Statuses } from './statuses.enum';
import { Priorities } from './priorities.enum';
import { Runtime } from './runtime.interface';
import { Parameter } from './parameter.interface';

/**
 * Интерфейс заявки
 */
export interface SdRequest {
  /**
   * ID (номер) заявки.
   */
  readonly id: number;

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
   * Статус
   */
  readonly status: Statuses;

  /**
   * Приоритет
   */
  readonly priority: Priorities;

  /**
   * Объект Runtime
   */
  readonly runtime: Runtime;

  /**
   * Массив объектов Parameter
   */
  readonly parameters: Parameter[];

  /**
   * Оценка качества обслуживания
   */
  readonly rating: number;
}