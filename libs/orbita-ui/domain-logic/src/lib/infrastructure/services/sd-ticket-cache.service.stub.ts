import { SdTicket } from './../../entities/models/sd/sd-ticket.interface';
import { SdService } from './../../entities/models/sd/sd-service.interface';

export class SdTicketCacheServiceStub {
  static normalizeSdRequests(tickets: SdTicket[] = [], services: SdService[] = []) {
    return {
      entities: {
        tickets,
        services,
      },
    };
  }
}
