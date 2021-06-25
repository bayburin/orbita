export interface EmployeeBase {
  /**
   * фамилия
   */
  readonly lastName: string;

  /**
   * Имя
   */
  readonly firstName: string;

  /**
   * Отчество
   */
  readonly middleName: string;

  /**
   * Уникальный IdTn
   */
  readonly id: number;

  /**
   * Дата рождения
   */
  readonly dateOfBirth: string;

  /**
   * Пол
   */
  readonly sex: GenderTypes;
}

/**
 * Пол
 */
export type GenderTypes = 'М' | 'Ж';
