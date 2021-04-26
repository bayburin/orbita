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
}

/**
 * Объект маппинга статуса для отображения в представление
 */
export const sdRequestStatusesMap: Record<Statuses, StatusesData> = {
  [Statuses.OPENED]: { title: 'Открыта' },
  [Statuses.AT_WORK]: { title: 'В работе' },
  [Statuses.CANCELED]: { title: 'Отменена' },
  [Statuses.DONE]: { title: 'Выполнена' },
};

/**
 * Функция возвращает значение объекта sdRequestStatusesMap исходя из полученного статуса
 *
 * @param status - статус
 */
export function getSdRequestStatus(status: Statuses): StatusesData {
  return sdRequestStatusesMap[status];
}
