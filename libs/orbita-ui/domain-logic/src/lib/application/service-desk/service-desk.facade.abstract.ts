import { Observable } from 'rxjs';

import { SdTicket } from './../../entities/models/sd/sd-ticket.interface';
import { SdService } from './../../entities/models/sd/sd-service.interface';
import { SdTicketViewModel } from './../../entities/view-models/sd-ticket-view-model.interface';

export abstract class ServiceDeskFacadeAbstract {
  /**
   * Индикатор, идет ли загрузка видов тикетов в данный момент
   */
  loadingSdTickets$: Observable<boolean>;
  /**
   * Индикатор, загружены ли виды тикетов
   */
  loadedSdTickets$: Observable<boolean>;
  /**
   * Загружает список видов тикетов из техподдержки
   */
  loadSdTickets$: Observable<void | SdTicket[]>;
  /**
   * Выбранный вид тикета техподдержки
   */
  sdTicket$: Observable<SdTicket>;
  /**
   * Список видов тикетов техподдержки
   */
  sdTickets$: Observable<SdTicket[]>;
  /**
   * Список услуг
   */
  sdServices$: Observable<SdService[]>;
  /**
   * Список видов тикетов техподдержки с типом "заявка в свободной форме"
   */
  allFreeApplicationsViewModel$: Observable<SdTicketViewModel[]>;
}
