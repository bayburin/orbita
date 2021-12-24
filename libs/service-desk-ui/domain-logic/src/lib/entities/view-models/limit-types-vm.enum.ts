import { LimitTypes } from '../models/notification.interface';

export interface LimitTypesVM {
  /**
   * Иконка
   */
  icon: string;
}

const LimitTypesVMMap: Record<LimitTypes, LimitTypesVM> = {
  [LimitTypes.LIMITED]: { icon: 'mdi-arrow-down-drop-circle-outline' },
  [LimitTypes.FULL]: { icon: 'mdi-arrow-up-drop-circle-outline' },
};

/**
 * Функция возвращает значение объекта LimitTypesVMMap исходя из полученного вида ограничения
 *
 * @param limitType - вид ограничения
 */
export function getLimitTypesVM(limitType: LimitTypes): LimitTypesVM {
  return LimitTypesVMMap[limitType];
}
