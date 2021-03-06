import { EmployeeShort } from './../../entities/models/employee/employee-short.interface';
import { Observable } from 'rxjs';

import { Employee } from './../../entities/models/employee/employee.interface';
import { PrimeFilter } from '../../entities/prime-filter.interface';

export abstract class EmployeeFacadeAbstract {
  /**
   * Индикатор загрузки
   */
  loadingEmployee$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loadedEmployee$: Observable<boolean>;
  /**
   * Работник, найденный по IdTn
   */
  employee$: Observable<Employee>;
  /**
   * Ошибка, полученная при загрузке работника
   */
  errorEmployee$: Observable<any>;
  /**
   * Список работников
   */
  allShort$: Observable<EmployeeShort[]>;
  /**
   * Индикатор, загружены ли данные
   */
  loadedAllShort$: Observable<boolean>;
  /**
   * Число найденных записей
   */
  totalCountShort$: Observable<number>;
  /**
   * Индикатор загрузки
   */
  loadingShort$: Observable<boolean>;

  /**
   * Загружает указанного работника по его идентификатору из URL
   */
  abstract overviewSingleEmployee(): void;

  /**
   * Поиск работников
   *
   * @param filters - атрибуты поиска
   */
  abstract search(filters: PrimeFilter): void;

  /**
   * Поиск работник по одному указанному фильтру
   *
   * @param key - имя фильтра
   * @param value - значение фильтра
   */
  abstract searchBySingleProp(key: string, value: string): void;

  /**
   * Очищает список работников
   */
  abstract clearEmployeeShortEntities(): void;

  /**
   * Очищает данные о выбранном работнике
   */
  abstract clearSelectedEmployee(): void;
}
