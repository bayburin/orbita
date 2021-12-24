import { ResponsibleUser } from '../models/responsible-user.interface';

/**
 * Представление услуги
 */
export interface TicketOverviewServiceVM {
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
   * Ответственные
   */
  readonly responsible_users: ResponsibleUser[];
}
