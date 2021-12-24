import { LimitTypes } from './notification.interface';

const LimitTypesValueMap: Record<LimitTypes, number> = {
  [LimitTypes.LIMITED]: 5,
  [LimitTypes.FULL]: 100,
};

/**
 * Функция возвращает значение объекта LimitTypesValueMap исходя из полученного вида ограничения
 *
 * @param limitType - вид ограничения
 */
export function getLimitTypesValue(limitType: LimitTypes): number {
  return LimitTypesValueMap[limitType];
}
