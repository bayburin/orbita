/**
 * Приоритеты заявки
 */
export enum Priorities {
  DEFAULT = 'default',
  LOW = 'low',
  HIGH = 'high'
}

/**
 * Интерфейс маппинга приоритета для отображения в представлении
 */
export interface PrioritiesData {
  /**
   * Название приоритета
   */
  title: string;
}

/**
 * Объект маппинга приоритета для отображения в представление
 */
export const sdRequestPrioritiesMap: Record<Priorities, PrioritiesData> = {
  [Priorities.DEFAULT]: { title: 'Стандартный' },
  [Priorities.LOW]: { title: 'Низкий' },
  [Priorities.HIGH]: { title: 'Высокий' },
};

/**
 * Функция возвращает значение объекта sdRequestPrioritiesMap исходя из полученного приоритета
 *
 * @param priority - приоритет
 */
export function getSdRequestPriority(priority: Priorities): PrioritiesData {
  return sdRequestPrioritiesMap[priority];
}
