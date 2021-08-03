import { PrimeFilter } from './../../entities/prime-filter.interface';

export const convertPrimeFilter = (filters: PrimeFilter) => {
  return Object.keys(filters).reduce((acc, key) => {
    acc[key] = filters[key].value;

    return acc;
  }, {} as { [key: string]: any });
};
