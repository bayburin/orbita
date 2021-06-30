import { CsaStatuses } from './../models/host.interface';
/**
 * Интерфейс маппинга статуса антивируса для отображения в представлении
 */
export interface CsaStatusesViewModel {
  title: string;
}

/**
 * Фабрика для создания представлений
 */
class CsaStatusesViewModelFactory {
  static create(title: string): CsaStatusesViewModel {
    return { title };
  }
}

/**
 * Объект маппинга статуса антивируса для отображения в представление
 */
export const csaStatusesViewModelMap: Record<CsaStatuses, CsaStatusesViewModel> = {
  [CsaStatuses.NOT_INST]: CsaStatusesViewModelFactory.create('Программа не установлена'),
  [CsaStatuses.INST]: CsaStatusesViewModelFactory.create('Программа установлена'),
  [CsaStatuses.TEMP_NOT_INST]: CsaStatusesViewModelFactory.create('Временно не установлен'),
  [CsaStatuses.NOT_INST_BY_WORK_MEMO]: CsaStatusesViewModelFactory.create('Не установлен по служебной записке'),
  [CsaStatuses.NOT_INST_BY_INCOMPAT]: CsaStatusesViewModelFactory.create(
    'Не установлен по причине программной несовместимости'
  ),
  [CsaStatuses.NOT_INST_BY_LOW_PERF]: CsaStatusesViewModelFactory.create(
    'Не установлен по причине слабой производительности'
  ),
  [CsaStatuses.TOP_MANAGER]: CsaStatusesViewModelFactory.create('Высшее руководство'),
  [CsaStatuses.NOT_INST_BY_AGR]: CsaStatusesViewModelFactory.create('Не установлен по устной договоренности'),
  [CsaStatuses.NET_HARDWARE]: CsaStatusesViewModelFactory.create('Сетевое оборудование'),
  [CsaStatuses.KASPERSKY]: CsaStatusesViewModelFactory.create('Установлен Kaspersky'),
  [CsaStatuses.WORK_MEMO_NOT_CHECKED]: CsaStatusesViewModelFactory.create('По служебной записке, не проверено'),
};

/**
 * Функция возвращает значение объекта csaStatusesViewModelMap исходя из полученного статуса
 *
 * @param name - статус
 */
export function getViewModelCsaStatuses(status: CsaStatuses): CsaStatusesViewModel {
  return csaStatusesViewModelMap[status];
}
