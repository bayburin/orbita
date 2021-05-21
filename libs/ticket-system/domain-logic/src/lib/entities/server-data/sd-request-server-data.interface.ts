import { SdRequest } from '../models/sd-request.interface';

/**
 * Описывает ответ с сервера по запросу списка заявок
 */
export interface SdRequestServerData {
  /**
   * Массив объектов заявки SdRequest
   */
  sd_requests: SdRequest[];

  /**
   * Объект метаданных
   */
  meta: {
    /**
     * Текущая страница
     */
    current_page: number;

    /**
     * Общее число заявок
     */
    total_count: number;
  }
}
