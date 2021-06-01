import { SdRequestService } from './sd-request-service.interface';

/**
 * Интерфейс типа заявки в свободной форме
 */
export interface FreeSdRequestType {
  /**
   * Идентификатор вида заявки
   */
  readonly identity: number;

  /**
   * Имя вида заявки
   */
  readonly name: string;

  /**
   * Объект услуги
   */
  readonly service: SdRequestService;
}
