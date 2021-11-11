import { normalize } from 'normalizr';

import { SdTicket } from './../../entities/models/sd/sd-ticket.interface';
import { NormalizedSdTickets } from './../../entities/models/normalized-data.interface';
import { sdTicketsSchema, sdTicketSchema } from './../schemas/normalizr.schema';

/**
 * Сервис для нормализации данных по услугам и видам заявок
 */
export class SdTicketCacheService {
  static normalizeSdTickets(sdTickets: SdTicket[]): NormalizedSdTickets {
    return normalize(sdTickets, sdTicketsSchema);
  }

  static normalizeSdTicket(sdTicket: SdTicket): NormalizedSdTickets {
    return normalize(sdTicket, sdTicketSchema);
  }
}
