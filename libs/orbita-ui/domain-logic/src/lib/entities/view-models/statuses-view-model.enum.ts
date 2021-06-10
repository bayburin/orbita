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
 * Объект маппинга статуса для отображения в представление
 */
export const statusesViewModelMap: Record<Statuses, StatusesViewModel> = {
  [Statuses.OPENED]: {
    title: 'Открыта',
    badge: 'opened',
  },
  [Statuses.AT_WORK]: {
    title: 'В работе',
    badge: 'at_work',
  },
  [Statuses.CANCELED]: {
    title: 'Отменена',
    badge: 'canceled',
  },
  [Statuses.DONE]: {
    title: 'Выполнена',
    badge: 'done',
  },
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
