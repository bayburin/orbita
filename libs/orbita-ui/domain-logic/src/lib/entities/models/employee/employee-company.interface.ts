/**
 * Компания
 */
export interface EmployeeCompany {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Номер подразделения (фиктивный)
   */
  readonly code: number;

  /**
   * Короткое наименование компании
   */
  readonly shortName: number;

  /**
   * Полное наименование компании
   */
  readonly name: number;
}
