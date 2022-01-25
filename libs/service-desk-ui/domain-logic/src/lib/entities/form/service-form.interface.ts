import { ResponsibleUserForm } from './responsible-user-form.interface';
import { Hideable } from '../models/hideable.interface';

/**
 * Услуга
 */
export interface ServiceForm extends Hideable {
  /**
   * Идентификатор
   */
  id: number;

  /**
   * Идентификатор категории
   */
  category_id: number;

  /**
   * Наименование
   */
  name: string;

  /**
   * Краткое описание
   */
  short_description: string;

  /**
   * Флаг, показывающий, имеет ли вопрос "свободный" вопрос
   */
  has_common_case: boolean;

  /**
   * Ответственные
   */
  responsible_users: ResponsibleUserForm[];
}
