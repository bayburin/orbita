import { EmployeeFilters } from './../models/employee/employee-filters.enum';

/**
 * Интерфейс маппинга фильтра для отображения в представлении
 */
export interface EmployeeFiltersViewModel {
  /**
   * Название фильтра
   */
  title: string;
}

/**
 * Фабрика для создания представлений
 */
class EmployeeFiltersViewModelFactory {
  static create(title: string): EmployeeFiltersViewModel {
    return { title };
  }
}

/**
 * Объект маппинга фильтров для отображения в представление
 */
export const employeeFiltersViewModelMap: Record<EmployeeFilters, EmployeeFiltersViewModel> = {
  [EmployeeFilters.PHONE]: EmployeeFiltersViewModelFactory.create('Телефон'),
  [EmployeeFilters.TN]: EmployeeFiltersViewModelFactory.create('Таб. номер'),
  [EmployeeFilters.FIO]: EmployeeFiltersViewModelFactory.create('ФИО'),
  [EmployeeFilters.DEPT]: EmployeeFiltersViewModelFactory.create('Подразделение'),
};

/**
 * Массив фильтров
 */
export const employeeFiltersArray: EmployeeFilters[] = Object.keys(employeeFiltersViewModelMap).reduce(
  (arr, filter) => arr.concat(filter as EmployeeFilters),
  []
);

/**
 * Массив представлений фильтров
 */
export const employeeFiltersViewModelArray: EmployeeFiltersViewModel[] = Object.keys(
  employeeFiltersViewModelMap
).reduce(
  (arr, filter) =>
    arr.concat({
      filter,
      ...getViewModelEmployeeFilters(filter as EmployeeFilters),
    }),
  []
);

/**
 * Функция возвращает значение объекта employeeFiltersViewModelMap исходя из полученного фильтра
 *
 * @param filter - фильтр
 */
export function getViewModelEmployeeFilters(filter: EmployeeFilters): EmployeeFiltersViewModel {
  return employeeFiltersViewModelMap[filter];
}
