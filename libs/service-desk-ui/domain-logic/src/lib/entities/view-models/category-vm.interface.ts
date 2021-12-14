import { QuestionVM } from './question-vm.interface';
import { ServiceVM } from './service-vm.interface';

/**
 * Представление категории
 */
export interface CategoryVM {
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
   * Список услуг
   */
  readonly services: ServiceVM[];

  /**
   * Список часто-задаваемых вопросов
   */
  // readonly faq?: QuestionVM[];
}
