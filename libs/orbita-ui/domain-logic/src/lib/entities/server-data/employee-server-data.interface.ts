import { Employee } from './../models/employee/employee.interface';
import { EmployeeShort } from './../models/employee/employee-short.interface';

/**
 * Описывает ответ с сервера по запросу данных по работнику по IdTn
 */
export interface EmployeeServerData {
  /**
   * Найденный работник
   */
  employee: Employee;
}

/**
 * Описывает ответ с сервера по запросу данных по списку работников
 */
export interface EmployeeShortServerData {
  /**
   * Массив найденных работников
   */
  employees: EmployeeShort[];
}
