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
  /**
   * Ключ приоритета
   */
  priority?: Priorities;
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
  [Priorities.MEDIUM]: PrioritiesViewModelFactory.create('Средний', 'medium'),
  [Priorities.HIGH]: PrioritiesViewModelFactory.create('Высокий', 'high'),
};

/**
 * Массив приоритетов
 */
export const prioritiesArray = Object.values(Priorities).reduce<Priorities[]>((arr, priority) => {
  arr.push(priority as Priorities);

  return arr;
}, []);

/**
 * Массив приоритетов
 */
export const prioritiesViewModelArray = (Object.keys(prioritiesViewModelMap) as Priorities[]).reduce<
  PrioritiesViewModel[]
>((arr, priority) => {
  arr.push({
    priority,
    ...getViewModelPriority(priority),
  });

  return arr;
}, []);

/**
 * Функция возвращает значение объекта sdRequestPrioritiesMap исходя из полученного приоритета
 *
 * @param priority - приоритет
 */
export function getViewModelPriority(priority: Priorities): PrioritiesViewModel {
  return prioritiesViewModelMap[priority];
}
