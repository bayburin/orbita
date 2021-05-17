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
  [EventTypeNames.OPEN]: { icon: 'mdi-comment-check-outline' }, // ?
  [EventTypeNames.WORKFLOW]: { icon: 'mdi-comment-text-outline' }, // +
  [EventTypeNames.ADD_WORKERS]: { icon: 'mdi-account-multiple-plus-outline' },
  [EventTypeNames.DEL_WORKERS]: { icon: 'mdi-account-multiple-minus-outline' },
  [EventTypeNames.ESCALATION]: { icon: 'mdi-alert-outline' },
  [EventTypeNames.POSTPONE]: { icon: 'mdi-calendar-clock' },
  [EventTypeNames.CLOSE]: { icon: 'mdi-close-box-outline' },
  [EventTypeNames.ADD_FILES]: { icon: 'mdi-file-plus-outline' },
  [EventTypeNames.DEL_FILES]: { icon: 'mdi-file-remove-outline' },
  [EventTypeNames.ADD_TAGS]: { icon: 'mdi-code-tags' },
  [EventTypeNames.PRIORITY]: { icon: 'mdi-priority-high' }
};

/**
 * Функция возвращает значение объекта eventTypeNamesMap исходя из полученного вида события
 *
 * @param name - имя вида события
 */
export function getEventTypeName(name: EventTypeNames): EventTypeNamesData {
  return eventTypeNamesMap[name];
}
