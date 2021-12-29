import { Service } from '../../entities/models/service.interface';
import { User } from '../../entities/models/user.interface';
import { KaseViewForm } from './../../entities/form/kase-view-form.interface';

/**
 * Фабрика по созданию сущностей кейсов
 */
export class KaseFactory {
  /**
   * Создает объект для формы новой заявки
   *
   * @param user -текущий пользователь
   */
  static createViewForm(
    user: User,
    {
      comment,
      desc,
      service,
      without_service = false,
      without_item = false,
    }: { comment: string; desc: string; service?: Service; without_service: boolean; without_item: boolean }
  ): KaseViewForm {
    return {
      id_tn: user.id_tn,
      user_tn: user.tn,
      fio: user.fio,
      dept: user.dept,
      email: user.email,
      phone: user.tel,
      mobile: '',
      service,
      desc,
      without_service,
      item: null,
      without_item,
      files: [],
      additional: { comment },
    };
  }
}
