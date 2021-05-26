import { EventTypeNames } from '../models/event-type.interface';

/**
 * Интерфейс маппинга вида событий для отображения в представлении
 */
export interface EventTypeNamesViewModel {
  icon: string;
}

/**
 * Объект маппинга вида событий для отображения в представление
 */
export const eventTypeNamesViewModelMap: Record<EventTypeNames, EventTypeNamesViewModel> = {
  [EventTypeNames.OPEN]: { icon: 'mdi-room-service-outline' },
  [EventTypeNames.WORKFLOW]: { icon: 'mdi-comment-text-outline' },
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
export function getViewModelEventTypeName(name: EventTypeNames): EventTypeNamesViewModel {
  return eventTypeNamesViewModelMap[name];
}
