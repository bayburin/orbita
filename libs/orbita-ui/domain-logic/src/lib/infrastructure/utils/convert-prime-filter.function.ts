import { PrimeFilter } from './../../entities/prime-filter.interface';
import { SimpleFilter } from './../../entities/filter.interface';

/**
 * Преобразует фильтры в более плоскую структуру вида { key: value }
 *
 * @param filters - фильтры таблицы
 */
export const convertPrimeFilter = (filters: PrimeFilter): SimpleFilter => {
  return Object.keys(filters).reduce<SimpleFilter>((acc, key) => {
    acc[key] = filters[key].value;

    return acc;
  }, {});
};
