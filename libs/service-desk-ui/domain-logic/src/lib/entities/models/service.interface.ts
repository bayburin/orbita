import { Hideable } from './hideable.interface';

/**
 * Услуга
 */
export interface Service extends Hideable {
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
   * Флаг, показывающий, имеет ли вопрос "свободный" вопрос
   */
  readonly has_common_case: boolean;

  /**
   * Рейтинг
   */
  readonly popularity: number;

  /**
   * Вопросы
   */
  readonly questions?: number[];

  /**
   * Ответственные
   */
  readonly responsible_users?: number[];
}
