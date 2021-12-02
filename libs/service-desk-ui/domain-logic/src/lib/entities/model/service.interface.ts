/**
 * Услуга
 */
export interface Service {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Идентификатор категории
   */
  readonly category_id: number;

  /**
   * Наименование
   */
  readonly name: string;

  /**
   * Краткое описание
   */
  readonly short_description: string;

  /**
   * Способ получения услуги
   */
  readonly install: string;

  /**
   * Флаг, показывающий, скрытый ли вопрос
   */
  readonly is_hidden: boolean;

  /**
   * Флаг, показывающий, имеет ли вопрос "свободный" вопрос
   */
  readonly has_common_case: boolean;

  /**
   * Рейтинг
   */
  readonly popularity: number;

  /**
   * Тикеты
   */
  readonly tickets?: number[];

  /**
   * Ответственные
   */
  readonly responsible_users?: number[];
}
