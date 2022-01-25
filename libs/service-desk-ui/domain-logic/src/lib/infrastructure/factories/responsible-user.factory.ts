import { ResponsibleUser } from '../../entities/models/responsible-user.interface';
import { ResponsibleUserForm } from '../../entities/form/responsible-user-form.interface';

/**
 * Фабрика по созданию сущностей услуг
 */
export class ResponsibleUserFactory {
  /**
   * Создает объект для формы новой записи
   */
  static createViewForm(user: ResponsibleUser = {} as ResponsibleUser): ResponsibleUserForm {
    return {
      id: user.id,
      tn: user.tn,
      details: user.details,
      _destroy: false,
    };
  }

  /**
   * Создает объект в виде формы, адаптированной под сервер, на основании заполненной формы
   */
  static createServerForm(user: ResponsibleUserForm = {} as ResponsibleUserForm): ResponsibleUserForm {
    return {
      id: user.id,
      tn: user.tn,
      _destroy: user._destroy,
    };
  }
}
