import { FilterMetadata } from 'primeng/api';

/**
 * Фильтры, использующиеся библиотекой Primeng.
 */
export interface PrimeFilter {
  [s: string]: FilterMetadata;
}
