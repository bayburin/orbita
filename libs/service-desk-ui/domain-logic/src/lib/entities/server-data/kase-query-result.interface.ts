import { Kase } from '../models/kase.interface';
import { Filter } from '../filter.interface';

/**
 * Результат загрузки заявок
 */
export interface KaseQueryResult {
  statuses: Filter[];
  apps: Kase[];
}
