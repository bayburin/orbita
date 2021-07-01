import { Statuses } from './../models/ticket.interface';

/**
 * Интерфейс маппинга статуса для отображения в представлении
 */
export interface StatusesViewModel {
  /**
   * Название статуса
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
class StatusesViewModelFactory {
  static create(title: string, badge: string): StatusesViewModel {
    return { title, badge };
  }
}

/**
 * Объект маппинга статуса для отображения в представление
 */
export const statusesViewModelMap: Record<Statuses, StatusesViewModel> = {
  [Statuses.OPENED]: StatusesViewModelFactory.create('Открыта', 'opened'),
  [Statuses.AT_WORK]: StatusesViewModelFactory.create('В работе', 'at_work'),
  [Statuses.CANCELED]: StatusesViewModelFactory.create('Отменена', 'canceled'),
  [Statuses.DONE]: StatusesViewModelFactory.create('Выполнена', 'done'),
};

/**
 * Массив статусов
 */
export const statusesViewModelArray = Object.keys(statusesViewModelMap).reduce(
  (arr, status) =>
    arr.concat({
      status,
      ...statusesViewModelMap[status as Statuses],
    }),
  []
);

/**
 * Функция возвращает значение объекта sdRequestStatusesMap исходя из полученного статуса
 *
 * @param status - статус
 */
export function getViewModelStatus(status: Statuses): StatusesViewModel {
  return statusesViewModelMap[status];
}
