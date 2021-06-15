import { Observable } from 'rxjs';

import { SdTicket } from './../../entities/models/sd/sd-ticket.interface';
import { SdService } from './../../entities/models/sd/sd-service.interface';

export abstract class ServiceDeskFacadeAbstract {
  /**
   * Индикатор, идет ли загрузка в данный момент
   */
  loading$: Observable<boolean>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;
  /**
   * Список видов тикетов техподдержки
   */
  sdTickets$: Observable<SdTicket[]>;
  /**
   * Список услуг
   */
  sdServices$: Observable<SdService[]>;
}
