/**
 * Категория
 */
export interface Category {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Имя категории
   */
  readonly name: string;

  /**
   * Описание
   */
  readonly short_description: string;

  /**
   * Рейтинг
   */
  readonly popularity: number;

  /**
   * Иконка
   */
  readonly icon_name: string;

  /**
   * Список идентификаторов услуг
   */
  readonly services: number[];

  /**
   * Список идентификаторов часто-задаваемых вопросов
   */
  readonly faq: number[];
}
