import { EmployeeContact } from './employee-contact.interface';
import { EmployeeBase } from './employee-base.interface';

/**
 * Интерфейс работника, полученный по id_tn
 */
export interface Employee extends EmployeeBase {
  /**
   * Данные о должности
   */
  readonly employeePositions?: EmployeePosition[];

  /**
   * Контактные данные
   */
  readonly employeeContact?: EmployeeContact;

  /**
   * Рабочий график
   */
  readonly employeeSchedules?: EmployeeSchedules[];
}

/**
 * Интерфейс данных о должности
 */
export interface EmployeePosition {
  /**
   * Уникальный IdTn
   */
  readonly employeeId: number;

  /**
   * Табельный номер
   */
  readonly personnelNo: number;

  /**
   * Должность
   */
  readonly professionForAccounting: string;

  /**
   * Номер подразделения
   */
  readonly departmentForAccounting: number;

  /**
   * Категория
   */
  readonly employeeCategory: string;

  /**
   * Самоятоятельная структурная единица
   */
  readonly struct: string;
}

export interface EmployeeSchedules {
  /**
   * Уникальный IdTn
   */
  readonly id: number;

  /**
   * Начало рабочего дня
   */
  readonly shiftStartTime: string;

  /**
   * Окончание рабочего дня
   */
  readonly shiftEndTime: string;

  /**
   * Начало обеденного времени
   */
  readonly dinnerStartTime: string;

  /**
   * Окончание обеденного времени
   */
  readonly dinnerEndTime: string;

  /**
   * Продолжительность обеда
   */
  readonly dinnerDuration: string;
}
