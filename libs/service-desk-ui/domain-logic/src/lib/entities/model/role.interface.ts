/**
 * Роль
 */
export interface Role {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Наименование
   */
  readonly name: string;

  /**
   * Краткое описание
   */
  readonly short_description: string;

  /**
   * Полное описание
   */
  readonly long_description: string;
}
