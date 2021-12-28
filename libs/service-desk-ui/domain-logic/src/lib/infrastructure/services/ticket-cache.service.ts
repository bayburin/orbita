import { schema, normalize, denormalize } from 'normalizr';

import { Ticket } from '../../entities/models/ticket.interface';
import { NormalizedTickets, NormalizedTicketsEntities } from '../../entities/normalized-data.interface';
import { TicketOverviewVM } from '../../entities/view-models/ticket-overview-vm.interface';

export const responsibleUserSchema = new schema.Entity('responsible_users');

export const serviceSchema = new schema.Entity('services', {
  responsible_users: [responsibleUserSchema],
});

export const ticketSchema = new schema.Entity('tickets', {
  service: serviceSchema,
  responsible_users: [responsibleUserSchema],
});

/**
 * Сервис для нормализации данных по тикетам
 */
export class TicketCacheService {
  static normalizeTickets(ticket: Ticket): NormalizedTickets {
    return normalize(ticket, ticketSchema);
  }

  static denormalizeTicket(ticket: Ticket, entities: NormalizedTicketsEntities): TicketOverviewVM {
    return denormalize(ticket, ticketSchema, entities);
  }
}
