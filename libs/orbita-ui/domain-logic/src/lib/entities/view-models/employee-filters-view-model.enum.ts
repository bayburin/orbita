import { EmployeeFilters } from './../models/employee/employee-filters.enum';

/**
 * Интерфейс маппинга фильтра для отображения в представлении
 */
export interface EmployeeFiltersViewModel {
  /**
   * Название фильтра
   */
  title: string;
  /**
   * placeholder для input-элемента, фильтрующему работников
   */
  inputPlaceHolder: string;
}

/**
 * Фабрика для создания представлений
 */
class EmployeeFiltersViewModelFactory {
  static create(title: string, inputPlaceHolder: string): EmployeeFiltersViewModel {
    return { title, inputPlaceHolder };
  }
}

/**
 * Объект маппинга фильтров для отображения в представление
 */
export const employeeFiltersViewModelMap: Record<EmployeeFilters, EmployeeFiltersViewModel> = {
  [EmployeeFilters.FIO]: EmployeeFiltersViewModelFactory.create('ФИО', 'Введите ФИО...'),
  [EmployeeFilters.TN]: EmployeeFiltersViewModelFactory.create('Таб. номер', 'Введите табельный номер...'),
  [EmployeeFilters.DEPT]: EmployeeFiltersViewModelFactory.create('Подразделение', 'Введите номер подразделения...'),
  [EmployeeFilters.PHONE]: EmployeeFiltersViewModelFactory.create('Телефон', 'Введите номер телефона...'),
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
