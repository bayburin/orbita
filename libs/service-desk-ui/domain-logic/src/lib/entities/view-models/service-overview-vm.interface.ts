import { QuestionVM } from './question-vm.interface';
import { ResponsibleUser } from '../models/responsible-user.interface';
import { Hideable } from '../models/hideable.interface';
import { Category } from '../models/category.interface';

/**
 * Представление услуги
 */
export interface ServiceOverviewVM extends Hideable {
  /**
   * Идентификатор
   */
  readonly id: number;

  /**
   * Идентификатор категории
   */
  readonly category_id: number;

  /**
   * Категория
   */
  readonly category: Category;

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
  readonly questions?: QuestionVM[];

  /**
   * Ответственные
   */
  readonly responsible_users?: ResponsibleUser[];
}
