/**
 * Виды событий
 */
export enum EventTypeNames {
  OPEN = 'open',
  WORKFLOW = 'workflow',
  ADD_WORKERS = 'add_workers',
  DEL_WORKERS = 'del_workers',
  ESCALATION = 'escalation',
  POSTPONE = 'postpone',
  CLOSE = 'close',
  ADD_FILES = 'add_files',
  DEL_FILES = 'del_files',
  ADD_TAGS = 'add_tags'
}

/**
 * Интерфейс маппинга вида событий для отображения в представлении
 */
export interface IEventTypeNamesData {
  icon: string;
}

/**
 * Объект маппинга вида событий для отображения в представление
 */
export const eventTypeNamesMap: Record<EventTypeNames, IEventTypeNamesData> = {
  [EventTypeNames.OPEN]: { icon: 'comment-check-outline' },
  [EventTypeNames.WORKFLOW]: { icon: 'comment-text-outline' },
  [EventTypeNames.ADD_WORKERS]: { icon: 'calendar-clock' },
  [EventTypeNames.DEL_WORKERS]: { icon: 'checkbox-marked-circle-outline' },
  [EventTypeNames.ESCALATION]: { icon: 'checkbox-marked-circle-outline' },
  [EventTypeNames.POSTPONE]: { icon: 'checkbox-marked-circle-outline' },
  [EventTypeNames.CLOSE]: { icon: 'checkbox-marked-circle-outline' },
  [EventTypeNames.ADD_FILES]: { icon: 'checkbox-marked-circle-outline' },
  [EventTypeNames.DEL_FILES]: { icon: 'checkbox-marked-circle-outline' },
  [EventTypeNames.ADD_TAGS]: { icon: 'checkbox-marked-circle-outline' },
};

/**
 * Функция возвращает значение объекта eventTypeNamesMap исходя из полученного вида события
 *
 * @param name - имя вида события
 */
export function getEventTypeName(name: EventTypeNames): IEventTypeNamesData {
  return eventTypeNamesMap[name];
}
