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
  /**
   * Флаг, показывающий публичность атрибута
   */
  isPublic: boolean;
  /**
   * Ключ фильтра
   */
  filter?: EmployeeFilters;
}

/**
 * Фабрика для создания представлений
 */
class EmployeeFiltersViewModelFactory {
  static create(title: string, inputPlaceHolder: string, isPublic: boolean = true): EmployeeFiltersViewModel {
    return { title, inputPlaceHolder, isPublic };
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
  [EmployeeFilters.ID_TN]: EmployeeFiltersViewModelFactory.create('Идентификатор', '', false),
};

/**
 * Массив фильтров
 */
export const employeeFiltersArray = Object.keys(employeeFiltersViewModelMap).reduce<EmployeeFilters[]>(
  (arr, filter) => {
    arr.push(filter as EmployeeFilters);

    return arr;
  },
  []
);

/**
 * Массив представлений фильтров
 */
export const employeeFiltersViewModelArray = (Object.keys(employeeFiltersViewModelMap) as EmployeeFilters[])
  .reduce<EmployeeFiltersViewModel[]>((arr, filter) => {
    arr.push({
      filter,
      ...getViewModelEmployeeFilters(filter),
    });

    return arr;
  }, [])
  .filter((el) => el.isPublic);

/**
 * Функция возвращает значение объекта employeeFiltersViewModelMap исходя из полученного фильтра
 *
 * @param filter - фильтр
 */
export function getViewModelEmployeeFilters(filter: EmployeeFilters): EmployeeFiltersViewModel {
  return employeeFiltersViewModelMap[filter];
}
