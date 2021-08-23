import { Component, OnDestroy } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { SdRequestFacade, UserFacade, ServiceDeskFacade, SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-sd-requests-block',
  templateUrl: './sd-requests-block.component.html',
  styleUrls: ['./sd-requests-block.component.scss'],
})
export class SdRequestsBlockComponent implements OnDestroy {
  loading$ = this.sdRequestFacade.loading$;
  sdRequests$ = this.sdRequestFacade.all$;
  totalCount$ = this.sdRequestFacade.totalCount$;
  users$ = this.userFacade.all$;
  sdServices$ = this.sdFacade.sdServices$;
  sdTickets$ = this.sdFacade.sdTickets$;
  tableEventData: LazyLoadEvent;

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private userFacade: UserFacade,
    private sdFacade: ServiceDeskFacade,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Событие изменения метаданных таблицы
   *
   * @param event - метаданные для загрузки данных таблицы
   */
  tableChanged(event: LazyLoadEvent): void {
    this.tableEventData = event;
    this.sdRequestFacade.loadSdRequestsTable(event);
  }

  /**
   * Перезагружает таблицу
   */
  reloadTable(): void {
    this.sdRequestFacade.loadSdRequestsTable(this.tableEventData);
  }

  ngOnDestroy(): void {
    this.sdRequestFacade.clearAll();
  }

  /**
   * Переходит на страницу детального просмотра выбранной заявки
   *
   * @param sdRequest - выбранный работник
   */
  redirectToSdRequestPage(sdRequest: SdRequestViewModel) {
    this.router.navigate(['sd-requests', sdRequest.id], { relativeTo: this.route });
  }
}
