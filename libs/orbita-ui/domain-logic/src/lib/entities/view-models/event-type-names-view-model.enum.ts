import { EventTypeNames } from '../models/event-type.interface';

/**
 * Интерфейс маппинга вида событий для отображения в представлении
 */
export interface EventTypeNamesViewModel {
  icon: string;
}

/**
 * Фабрика для создания представлений
 */
class EventTypeNamesViewModelFactory {
  static create(icon: string): EventTypeNamesViewModel {
    return { icon };
  }
}

/**
 * Объект маппинга вида событий для отображения в представление
 */
export const eventTypeNamesViewModelMap: Record<EventTypeNames, EventTypeNamesViewModel> = {
  [EventTypeNames.OPEN]: EventTypeNamesViewModelFactory.create('mdi-room-service-outline'),
  [EventTypeNames.WORKFLOW]: EventTypeNamesViewModelFactory.create('mdi-comment-text-outline'),
  [EventTypeNames.ADD_WORKERS]: EventTypeNamesViewModelFactory.create('mdi-account-multiple-plus-outline'),
  [EventTypeNames.DEL_WORKERS]: EventTypeNamesViewModelFactory.create('mdi-account-multiple-minus-outline'),
  [EventTypeNames.ESCALATION]: EventTypeNamesViewModelFactory.create('mdi-alert-outline'),
  [EventTypeNames.POSTPONE]: EventTypeNamesViewModelFactory.create('mdi-calendar-clock'),
  [EventTypeNames.CLOSE]: EventTypeNamesViewModelFactory.create('mdi-close-box-outline'),
  [EventTypeNames.ADD_FILES]: EventTypeNamesViewModelFactory.create('mdi-file-plus-outline'),
  [EventTypeNames.DEL_FILES]: EventTypeNamesViewModelFactory.create('mdi-file-remove-outline'),
  [EventTypeNames.ADD_TAGS]: EventTypeNamesViewModelFactory.create('mdi-code-tags'),
  [EventTypeNames.PRIORITY]: EventTypeNamesViewModelFactory.create('mdi-priority-high'),
  [EventTypeNames.ADD_SELF]: EventTypeNamesViewModelFactory.create('mdi-account-check-outline'),
  [EventTypeNames.TO_USER_MESSAGE]: EventTypeNamesViewModelFactory.create('mdi-account-edit-outline'),
  [EventTypeNames.TO_USER_ACCEPT]: EventTypeNamesViewModelFactory.create('mdi-account-question-outline'),
  [EventTypeNames.FROM_USER_ACCEPT]: EventTypeNamesViewModelFactory.create('mdi-account-check-outline'),
};

/**
 * Функция возвращает значение объекта eventTypeNamesMap исходя из полученного вида события
 *
 * @param name - имя вида события
 */
export function getViewModelEventTypeName(name: EventTypeNames): EventTypeNamesViewModel {
  return eventTypeNamesViewModelMap[name];
}
