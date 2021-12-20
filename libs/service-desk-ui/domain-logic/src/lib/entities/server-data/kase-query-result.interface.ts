import { Kase } from './../model/kase.interface';
import { Filter } from '../filter.interface';

/**
 * Результат загрузки заявок
 */
export interface KaseQueryResult {
  statuses: Filter[];
  apps: Kase[];
}
