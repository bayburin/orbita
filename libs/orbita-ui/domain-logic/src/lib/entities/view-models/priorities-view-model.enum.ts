import { Priorities } from './../models/ticket.interface';

/**
 * Интерфейс маппинга приоритета для отображения в представлении
 */
export interface PrioritiesViewModel {
  /**
   * Название приоритета
   */
  title: string;
  /**
   * Тип badge
   */
  badge: string;
}

/**
 * Фабрика для создания представлений
 */
class PrioritiesViewModelFactory {
  static create(title: string, badge: string): PrioritiesViewModel {
    return { title, badge };
  }
}

/**
 * Объект маппинга приоритета для отображения в представление
 */
export const prioritiesViewModelMap: Record<Priorities, PrioritiesViewModel> = {
  [Priorities.DEFAULT]: PrioritiesViewModelFactory.create('Стандартный', 'default'),
  [Priorities.LOW]: PrioritiesViewModelFactory.create('Низкий', 'low'),
  [Priorities.HIGH]: PrioritiesViewModelFactory.create('Высокий', 'high'),
};

/**
 * Массив приоритетов
 */
export const prioritiesViewModelArray = Object.keys(prioritiesViewModelMap).reduce(
  (arr, priority) =>
    arr.concat({
      priority,
      ...prioritiesViewModelMap[priority as Priorities],
    }),
  []
);

/**
 * Функция возвращает значение объекта sdRequestPrioritiesMap исходя из полученного приоритета
 *
 * @param priority - приоритет
 */
export function getViewModelPriority(priority: Priorities): PrioritiesViewModel {
  return prioritiesViewModelMap[priority];
}
