import { Observable } from 'rxjs';

import { TicketOverviewVM } from './../../entities/view-models/ticket-overview-vm.interface';

export abstract class TicketFacadeAbstract {
  /**
   * Выбранная модель тикета
   */
  ticket$: Observable<TicketOverviewVM>;
  /**
   * Индикатор, загружены ли данные
   */
  loaded$: Observable<boolean>;

  /**
   * Загружает выбранный тикет
   */
  abstract loadSelected(): void;
}
