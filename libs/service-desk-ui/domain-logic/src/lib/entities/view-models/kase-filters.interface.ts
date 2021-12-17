/**
 * Фильтры заявок Astraea
 */
export interface KaseFilter {
  /**
   * Число записей
   */
  limit: number;

  /**
   * Смещение
   */
  offset: number;

  /**
   * Статус
   */
  status_id: number;

  /**
   * Массив идентификаторов услуг
   */
  service_ids: number[];
}
