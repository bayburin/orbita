/**
 * Описывает доп данные, возвращаемые сервером вместе с основным payload-ом
 */
export interface Meta {
  /**
   * Текущая страница
   */
  current_page: number;

  /**
  * Общее число заявок
  */
  total_count: number;
}
