import { EventTypes } from '../models/notification.interface';

export interface EventTypesVM {
  /**
   * Иконка уведомления
   */
  icon: string;
  /**
   * Возвращает класс цвета фона и цвета текста уведомления
   */
  className: string;
  /**
   * Определяет, закрывать ли уведомление автоматически
   */
  isAutoClose: boolean;
}

/**
 * Фабрика для создания представлений
 */
class EventTypesVMFactory {
  static create(icon: string, className: string = '', isAutoClose: boolean = true): EventTypesVM {
    return { icon, className, isAutoClose };
  }
}

const EventTypesVMMap: Record<EventTypes, EventTypesVM> = {
  [EventTypes.BROADCAST]: EventTypesVMFactory.create('mdi-information-outline'),
  [EventTypes.APP]: EventTypesVMFactory.create('mdi-card-text-outline', 'bg-info'),
  [EventTypes.ERROR]: EventTypesVMFactory.create('mdi-alert', 'bg-danger text-light', false),
};

/**
 * Функция возвращает значение объекта EventTypesVMMap исходя из полученного вида события
 *
 * @param eventType - вид события
 */
export function getViewModelEventType(eventType: EventTypes): EventTypesVM {
  return EventTypesVMMap[eventType];
}
