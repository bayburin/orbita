/**
 * Статусы заявки
 */
export enum Statuses {
  OPENED = 'opened',
  AT_WORK = 'at_work',
  CANCELED = 'canceled',
  DONE = 'done'
}

/**
 * Интерфейс маппинга статуса для отображения в представлении
 */
export interface StatusesData {
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
export const sdRequestStatusesMap: Record<Statuses, StatusesData> = {
  [Statuses.OPENED]: {
    title: 'Открыта',
    badge: 'badge-primary'
  },
  [Statuses.AT_WORK]: {
    title: 'В работе',
    badge: 'badge-info'
  },
  [Statuses.CANCELED]: {
    title: 'Отменена',
    badge: 'badge-secondary'
  },
  [Statuses.DONE]: {
    title: 'Выполнена',
    badge: 'badge-success'
  },
};

/**
 * Функция возвращает значение объекта sdRequestStatusesMap исходя из полученного статуса
 *
 * @param status - статус
 */
export function getSdRequestStatus(status: Statuses): StatusesData {
  return sdRequestStatusesMap[status];
}
