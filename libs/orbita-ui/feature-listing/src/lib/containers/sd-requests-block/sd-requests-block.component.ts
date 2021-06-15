import { Component } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { SdRequestFacade, UserFacade, ServiceDeskFacade } from '@orbita/orbita-ui/domain-logic';

@Component({
  selector: 'lib-sd-requests-block',
  templateUrl: './sd-requests-block.component.html',
  styleUrls: ['./sd-requests-block.component.scss'],
})
export class SdRequestsBlockComponent {
  loading$ = this.sdRequestFacade.loading$;
  sdRequests$ = this.sdRequestFacade.all$;
  firstRowIndex$ = this.sdRequestFacade.firstRowIndex$;
  totalCount$ = this.sdRequestFacade.totalCount$;
  perPage$ = this.sdRequestFacade.perPage$;
  users$ = this.userFacade.all$;
  sdServices$ = this.sdFacade.sdServices$;
  sdTickets$ = this.sdFacade.sdTickets$;

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private userFacade: UserFacade,
    private sdFacade: ServiceDeskFacade
  ) {}

  /**
   * Событие изменения метаданных таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  tableChanged(event: LazyLoadEvent): void {
    this.sdRequestFacade.setTableMetadata(event);
  }
}
