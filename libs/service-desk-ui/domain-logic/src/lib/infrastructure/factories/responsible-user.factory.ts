import { ResponsibleUser } from '../../entities/models/responsible-user.interface';
import { ResponsibleUserForm } from '../../entities/form/responsible-user-form.interface';

/**
 * Фабрика по созданию сущностей услуг
 */
export class ResponsibleUserFactory {
  /**
   * Создает объект для формы новой записи
   */
  static createForm(user: ResponsibleUser = {} as ResponsibleUser): ResponsibleUserForm {
    return {
      id: user.id,
      tn: user.tn,
      _destroy: false,
    };
  }
}
