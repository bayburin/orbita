import { ResponsibleUserFactory } from './responsible-user.factory';
import { ServiceOverviewVM } from '../../entities/view-models/service-overview-vm.interface';
import { ServiceForm } from '../../entities/form/service-form.interface';

/**
 * Фабрика по созданию сущностей услуг
 */
export class ServiceFactory {
  /**
   * Создает объект для формы новой записи
   */
  static createForm(service: ServiceOverviewVM = {} as ServiceOverviewVM): ServiceForm {
    const responsibleUsers = service.responsible_users
      ? service.responsible_users.map((user) => ResponsibleUserFactory.createForm(user))
      : [];

    return {
      id: service.id,
      category_id: service.category_id,
      name: service.name,
      short_description: service.short_description,
      is_hidden: service.is_hidden || false,
      has_common_case: service.has_common_case || false,
      responsible_users: responsibleUsers,
    };
  }
}
