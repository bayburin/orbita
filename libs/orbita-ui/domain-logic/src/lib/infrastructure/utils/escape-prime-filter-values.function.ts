import { PrimeFilter } from './../../entities/prime-filter.interface';

/**
 * Удаляет из фильтров спец символы
 *
 * @param filters - фильтры таблицы
 */
export const escapePrimeFilterValues = function (filters: PrimeFilter): PrimeFilter {
  return Object.keys(filters).reduce<PrimeFilter>((acc, key) => {
    const oldVal = filters[key].value;

    acc[key] = {
      ...filters[key],
      value: oldVal ? oldVal.replace(/[^а-яА-Я\w\d\s-]/gi, '') : oldVal,
    };

    return acc;
  }, {});
};
