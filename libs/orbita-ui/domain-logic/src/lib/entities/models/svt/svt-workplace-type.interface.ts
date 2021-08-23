/**
 * Тип рабочего места
 */
export interface SvtWorkplaceType {
  /**
   * Идентификатор типа РМ
   */
  readonly id: number;

  /**
   * Имя типа РМ
   */
  readonly name: string;

  /**
   * Описание типа РМ
   */
  readonly short_description: string;
}
