/**
 * Отпуск
 */
export interface EmployeeVacation {
  /**
   * Причина отпуска
   */
  readonly vacation?: string;

  /**
   * Дата начала отпуска
   */
  readonly vacationFrom?: string;

  /**
   * Дата окончания отпуска
   */
  readonly vacationTo?: string;
}
