import { Priorities } from './../models/ticket.interface';

/**
 * Интерфейс маппинга приоритета для отображения в представлении
 */
export interface PrioritiesViewModel {
  /**
   * Название приоритета
   */
  title: string;
}

/**
 * Объект маппинга приоритета для отображения в представление
 */
export const prioritiesViewModelMap: Record<Priorities, PrioritiesViewModel> = {
  [Priorities.DEFAULT]: { title: 'Стандартный' },
  [Priorities.LOW]: { title: 'Низкий' },
  [Priorities.HIGH]: { title: 'Высокий' },
};

/**
 * Функция возвращает значение объекта sdRequestPrioritiesMap исходя из полученного приоритета
 *
 * @param priority - приоритет
 */
export function getViewModelPriority(priority: Priorities): PrioritiesViewModel {
  return prioritiesViewModelMap[priority];
}
