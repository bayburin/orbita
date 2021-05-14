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
  ADD_TAGS = 'add_tags',
  PRIORITY = 'priority'
}

/**
 * Интерфейс маппинга вида событий для отображения в представлении
 */
export interface EventTypeNamesData {
  icon: string;
}

/**
 * Объект маппинга вида событий для отображения в представление
 */
export const eventTypeNamesMap: Record<EventTypeNames, EventTypeNamesData> = {
  [EventTypeNames.OPEN]: { icon: 'mdi-comment-check-outline' },
  [EventTypeNames.WORKFLOW]: { icon: 'mdi-comment-text-outline' },
  [EventTypeNames.ADD_WORKERS]: { icon: 'mdi-calendar-clock' },
  [EventTypeNames.DEL_WORKERS]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.ESCALATION]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.POSTPONE]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.CLOSE]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.ADD_FILES]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.DEL_FILES]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.ADD_TAGS]: { icon: 'mdi-checkbox-marked-circle-outline' },
  [EventTypeNames.PRIORITY]: { icon: 'mdi-comment-text-outline' }
};

/**
 * Функция возвращает значение объекта eventTypeNamesMap исходя из полученного вида события
 *
 * @param name - имя вида события
 */
export function getEventTypeName(name: EventTypeNames): EventTypeNamesData {
  return eventTypeNamesMap[name];
}
