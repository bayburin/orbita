import { TicketI } from '../../../../core/interfaces/ticket.interface';
import { ServiceI } from '../../../../core/interfaces/service.interface';
import { CommonServiceI } from '../../../../core/interfaces/common-service.interface';
import { Service } from '../../models/service/service.model';
import { Ticket, TicketTypes } from '../../models/ticket/ticket.model';
import { ServiceFactory } from '../../factories/service.factory';
import { TicketFactory } from '../../factories/tickets/ticket.factory';

export class Category implements CommonServiceI {
  id: number;
  name: string;
  shortDescription: string;
  popularity: number;
  iconName: string;
  services: Service[];
  // FIXME: Было
  // tickets: Ticket[];
  // FIXME: Стало
  tickets: any[];

  constructor(category: any = {}) {
    this.id = category.id || null;
    this.name = category.name || '';
    this.shortDescription = category.short_description || '';
    this.popularity = category.popularity || 0;
    this.iconName = category.icon_name;
    this.buildServices(category.services);
    this.buildFaq(category.faq);
  }

  getShowLink(): string {
    return `/categories/${this.id}`;
  }

  pageComponent(): string {
    return 'service-desk-ui-category-page-content';
  }

  private buildServices(services: ServiceI[]): void {
    if (!services || !services.length) {
      this.services = [];

      return;
    }

    this.services = services.map((service) => ServiceFactory.create(service)) || [];
  }

  private buildFaq(tickets: TicketI[]) {
    if (!tickets || !tickets.length) {
      this.tickets = [];

      return;
    }

    this.tickets = tickets.map((ticket) => TicketFactory.create(TicketTypes.QUESTION, ticket)) || [];
  }
}
