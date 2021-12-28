import { NotificationTypes } from '../models/notification.interface';

export interface NotificationTypesVM {
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
class NotificationTypesVMFactory {
  static create(icon: string, className: string = '', isAutoClose: boolean = true): NotificationTypesVM {
    return { icon, className, isAutoClose };
  }
}

const NotificationTypesVMMap: Record<NotificationTypes, NotificationTypesVM> = {
  [NotificationTypes.BROADCAST]: NotificationTypesVMFactory.create('mdi-information-outline'),
  [NotificationTypes.APP]: NotificationTypesVMFactory.create('mdi-clipboard-arrow-up-outline'),
  [NotificationTypes.ERROR]: NotificationTypesVMFactory.create('mdi-alert', 'bg-danger text-light', false),
  [NotificationTypes.INFO]: NotificationTypesVMFactory.create('mdi-card-text-outline', 'bg-info'),
};

/**
 * Функция возвращает значение объекта NotificationTypesVMMap исходя из полученного вида события
 *
 * @param eventType - вид события
 */
export function getViewModelNotificationType(eventType: NotificationTypes): NotificationTypesVM {
  return NotificationTypesVMMap[eventType];
}
