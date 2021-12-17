import { Kase } from './../model/kase.interface';
import { KaseStatus } from '../model/kase-status.interface';

/**
 * Результат загрузки заявок
 */
export interface KaseQueryResult {
  statuses: KaseStatus[];
  apps: Kase[];
}
