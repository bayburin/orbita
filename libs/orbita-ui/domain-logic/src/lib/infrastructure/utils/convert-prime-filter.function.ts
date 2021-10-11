import { PrimeFilter } from './../../entities/prime-filter.interface';
import { SimpleFilter } from './../../entities/filter.interface';

export const convertPrimeFilter = (filters: PrimeFilter): SimpleFilter => {
  return Object.keys(filters).reduce((acc, key) => {
    acc[key] = filters[key].value;

    return acc;
  }, {} as SimpleFilter);
};
