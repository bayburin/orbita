import * as moment from 'moment';

import { PrimeFilter } from './../../entities/prime-filter.interface';

export function processSdRequestTableFilters(filters: PrimeFilter) {
  // Преобразование строки в локализованную дату-время
  if (filters.created_at && filters.created_at.value) {
    filters.created_at.value = moment(filters.created_at.value).format();
  }
  // Для фильтров таблицы по статусу нужен целиком объект, а для сервера только строка статуса. Поэтому для хранилища меняем объект статуса на сам статус. Этот статус будет использоваться при запросах на сервер.
  if (filters.status && filters.status.value) {
    filters.status.value = filters.status.value.status;
  }
  // Для фильтров таблицы по приоритету нужен целиком объект, а для сервера только строка приоритета. Поэтому для хранилища меняем объект приоритета на сам приоритет. Этот приоритет будет использоваться при запросах на сервер.
  if (filters.priority && filters.priority.value) {
    filters.priority.value = filters.priority.value.priority;
  }

  return filters;
}
