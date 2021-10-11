import { EmployeeBase } from './employee-base.interface';
import { EmployeeVacation } from './employee-vacation.interface';

/**
 * Работник ИСС
 */
export interface EmployeeShort extends EmployeeBase, EmployeeVacation {
  /**
   * ФИО
   */
  readonly fullName: string;

  /**
   * Табельный номер
   */
  readonly personnelNo: number;

  /**
   * Номер подразделения
   */
  readonly departmentForAccounting: number;

  /**
   * Должность
   */
  readonly professionForAccounting: string;

  /**
   * Находится ли в отпуске/больничном/декрете
   */
  readonly inVacation: boolean;

  /**
   * Самоятоятельная структурная единица
   */
  readonly struct: string;

  /**
   * Рабочий телефон
   */
  readonly phoneText: string;

  /**
   * email
   */
  readonly emailText: string;

  /**
   * Расположение
   */
  readonly position: string;
}
