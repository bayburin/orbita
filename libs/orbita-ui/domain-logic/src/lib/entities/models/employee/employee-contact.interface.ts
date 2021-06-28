/**
 * Интерфейс контактных данных
 */
export interface EmployeeContact {
  /**
   * Уникальный IdTn
   */
  readonly id: number;

  /**
   * Расположение согласно ЛК
   */
  readonly position: string;

  /**
   * Рабочий телефон
   */
  readonly phone: string[];

  /**
   * Email
   */
  readonly email: string[];

  /**
   * Логин AD
   */
  readonly login: string;
}
