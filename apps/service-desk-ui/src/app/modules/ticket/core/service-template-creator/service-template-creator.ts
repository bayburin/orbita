import { ServiceTemplateI } from '../../../../core/interfaces/service-template.interface';
import { CategoryFactory } from '../../factories/category.factory';
import { ServiceFactory } from '../../factories/service.factory';
import { TicketFactory } from '../../factories/tickets/ticket.factory';

/**
 * Фабричный метод для создания экземпляров класса Category, Service, Ticket
 */
export class ServiceTemplateCreator {
  static createBy(template: ServiceTemplateI) {
    if (template.ticket) {
      return TicketFactory.create(template.ticket.ticketable_type, template);
    } else if (template.category_id) {
      return ServiceFactory.create(template);
    } else {
      return CategoryFactory.create(template);
    }
  }
}
