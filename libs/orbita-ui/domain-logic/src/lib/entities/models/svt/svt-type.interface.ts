/**
 * Тип ВТ
 */
export interface SvtType {
  /**
   * Идентификатор типа
   */
  readonly type_id: number;

  /**
   * Имя типа
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
