/**
 * Интерфейс, представляющий самостоятельное структурное подразделение (группу)
 */
export interface Group {
  /**
   * Идентификатор группы
   */
  readonly id: number;

  /**
   * Идентификатор номера отдела
   */
  readonly department_id: number;

  /**
   * Имя группы
   */
  readonly name: string;

  /**
   * Описание группы
   */
  readonly description: string;
}
