import { Employee } from './../models/employee/employee.interface';

/**
 * Описывает ответ с сервера по запросу данных по работнику по IdTn
 */
export interface EmployeeServerData {
  /**
   * Массив объектов заявки SdRequest
   */
  employee: Employee;
}
