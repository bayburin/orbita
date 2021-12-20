/**
 * Фильтр заявок Astraea по статусам
 */
export interface Filter {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Имя
   */
  name: string;

  /**
   * Число заявок с указанным статусом
   */
  count: number;
}
