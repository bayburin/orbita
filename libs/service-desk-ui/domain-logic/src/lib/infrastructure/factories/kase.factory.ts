import { KaseForm } from './../../entities/form/kase-form.interface';
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

  /**
   * Создает заявку в виде формы, адаптированной под сервер, на основании заполненной формы
   *
   * @param viewForm - форма, заполненная пользователем
   */
  static createServerForm(viewForm: KaseViewForm): KaseForm {
    let itemData: any = {
      item_id: null,
      barcode: null,
      invent_num: null,
    };

    if (!viewForm.without_item) {
      itemData = {
        item_id: viewForm.item.item_id,
        barcode: viewForm.item.barcode_item ? viewForm.item.barcode_item.id : null,
        invent_num: viewForm.item.invent_num,
      };
    }

    return {
      ...itemData,
      id_tn: viewForm.id_tn,
      user_tn: viewForm.user_tn,
      fio: viewForm.fio,
      dept: viewForm.dept,
      email: viewForm.email,
      phone: viewForm.phone,
      mobile: viewForm.mobile,
      service_id: viewForm.without_service ? null : viewForm.service.id,
      desc: viewForm.desc,
      without_service: viewForm.without_service,
      without_item: viewForm.without_item,
      files: viewForm.files,
      additional: viewForm.additional,
    };
  }
}
