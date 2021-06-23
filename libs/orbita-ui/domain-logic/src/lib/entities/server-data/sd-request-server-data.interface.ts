import { SdRequest } from '../models/sd-request.interface';
import { Meta } from './meta.interface';

/**
 * Описывает ответ с сервера по запросу списка заявок
 */
export interface SdRequestsServerData {
  /**
   * Массив объектов заявки SdRequest
   */
  sd_requests: SdRequest[];

  /**
   * Объект метаданных
   */
  meta: Meta;
}

/**
 * Описывает ответ с сервера по запросу выбранной заявки
 */
export interface SdRequestServerData {
  /**
   * Объект заявки
   */
  sd_request: SdRequest;
}
