import { SdRequest } from './sd-request.interface';

export interface SdRequestQueue {
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

