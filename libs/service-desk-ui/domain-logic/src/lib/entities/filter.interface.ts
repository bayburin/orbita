/**
 * Фильтр заявок Astraea по статусам
 */
export interface Filter {
  /**
   * Идентификатор
   */
  id: string | number;

  /**
   * Имя
   */
  name: string;

  /**
   * Число заявок с указанным статусом
   */
  count: number;
}

/**
 * Виды фильтров для результатов поиска
 */
export enum DeepSearchFilterTypes {
  ALL = 'all',
  CATEGORY = 'Category',
  SERVICE = 'Service',
  QUESTION = 'Question',
}
