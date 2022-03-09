import { PrimeFilter } from './../../entities/prime-filter.interface';

/**
 * Обрабатывает фильтры, связанные с таблицей ВТ
 *
 * @param filters - фильтры таблицы
 */
export function processSvtItemTableFilters(filters: PrimeFilter) {
  // Для фильтров таблицы по типу ВТ нужен целиком объект, а для сервера только ID типа. Поэтому для хранилища меняем
  // объект типа на сам тип. Этот тип будет использоваться при запросах на сервер.
  if (filters.type_id && filters.type_id.value) {
    filters.type_id.value = filters.type_id.value.type_id;
  }

  return filters;
}
