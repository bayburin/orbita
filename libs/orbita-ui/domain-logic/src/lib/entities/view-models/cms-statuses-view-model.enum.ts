import { CmsStatuses } from './../models/host.interface';
/**
 * Интерфейс маппинга статуса программы Аудит для отображения в представлении
 */
export interface CmsStatusesViewModel {
  title: string;
}

/**
 * Фабрика для создания представлений
 */
class CmsStatusesViewModelFactory {
  static create(title: string): CmsStatusesViewModel {
    return { title };
  }
}

/**
 * Объект маппинга статуса программы Аудит для отображения в представление
 */
export const cmsStatusesViewModelMap: Record<CmsStatuses, CmsStatusesViewModel> = {
  [CmsStatuses.NOT_INST]: CmsStatusesViewModelFactory.create('Программа не установлена'),
  [CmsStatuses.INST]: CmsStatusesViewModelFactory.create('Программа установлена'),
  [CmsStatuses.TEMP_NOT_INST]: CmsStatusesViewModelFactory.create('Временно не установлен'),
  [CmsStatuses.NOT_INST_BY_WORK_MEMO]: CmsStatusesViewModelFactory.create('Не установлен по служебной записке'),
  [CmsStatuses.NOT_INST_BY_INCOMPAT]: CmsStatusesViewModelFactory.create(
    'Не установлен по причине программной несовместимости'
  ),
  [CmsStatuses.NOT_INST_BY_LOW_PERF]: CmsStatusesViewModelFactory.create(
    'Не установлен по причине слабой производительности'
  ),
  [CmsStatuses.TOP_MANAGER]: CmsStatusesViewModelFactory.create('Высшее руководство'),
  [CmsStatuses.NOT_INST_BY_AGR]: CmsStatusesViewModelFactory.create('Не установлен по устной договоренности'),
  [CmsStatuses.AUDIT_TRIED]: CmsStatusesViewModelFactory.create('Аудит: Пытался установить'),
  [CmsStatuses.AUDIT_WAITING_REBOOT]: CmsStatusesViewModelFactory.create('Аудит: Ожидание перезагрузки системы'),
  [CmsStatuses.AUDIT_ERROR]: CmsStatusesViewModelFactory.create('Аудит: Ошибка установки'),
  [CmsStatuses.NET_HARDWARE]: CmsStatusesViewModelFactory.create('Сетевое оборудование'),
};

/**
 * Функция возвращает значение объекта cmsStatusesViewModelMap исходя из полученного статуса
 *
 * @param name - статус
 */
export function getViewModelCmsStatuses(status: CmsStatuses): CmsStatusesViewModel {
  return cmsStatusesViewModelMap[status];
}
