import { EmployeeBase } from './employee-base.interface';

/**
 * Интерфейс работника
 */
export interface EmployeeShort extends EmployeeBase {
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
   * Находится ли в отпуске/больничном/декрете
   */
  readonly inVacation: boolean;

  /**
   * Причина отдыха
   */
  readonly vacation?: string;

  /**
   * Дата начала отдыха
   */
  readonly vacationFrom?: string;

  /**
   * Дата окончания отдыха
   */
  readonly vacationTo?: string;

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
