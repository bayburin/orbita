import { PrimeFilter } from './../../entities/prime-filter.interface';

/**
 * Фабрика по созданию фильтров
 */
export class PrimeFilterFactory {
  /**
   * Создает фильтр
   *
   * @param name - имя фильтра
   * @param value - значение фильтра
   * @param matchMode - режим поиска
   */
  static createFilter(name: string, value: any, matchMode: string = 'equals'): PrimeFilter {
    return {
      [name]: {
        value,
        matchMode,
      },
    };
  }
}
