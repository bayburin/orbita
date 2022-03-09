import { Component, OnInit, OnDestroy } from '@angular/core';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { SdRequestFacade, UserFacade, ServiceDeskFacade, SdRequestViewModel } from '@orbita/orbita-ui/domain-logic';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'lib-sd-requests-block',
  templateUrl: './sd-requests-block.component.html',
  styleUrls: ['./sd-requests-block.component.scss'],
})
export class SdRequestsBlockComponent implements OnInit, OnDestroy {
  loading$ = this.sdRequestFacade.loading$;
  sdRequests$ = this.sdRequestFacade.all$;
  totalCount$ = this.sdRequestFacade.totalCount$;
  users$ = this.userFacade.all$;
  sdServices$ = this.sdFacade.sdServices$;
  sdTickets$ = this.sdFacade.sdTickets$;
  subscriptions = new Subscription();
  tableEventData: LazyLoadEvent;

  constructor(
    private sdRequestFacade: SdRequestFacade,
    private userFacade: UserFacade,
    private sdFacade: ServiceDeskFacade,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(this.sdRequestFacade.connectToSdRequestsCreateChannel());
  }

  ngOnDestroy(): void {
    this.sdRequestFacade.clearAll();
    this.subscriptions.unsubscribe();
  }

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
    this.messageService.clear('newSdRequestsNotify');
    this.sdRequestFacade.loadSdRequestsTable(this.tableEventData);
  }

  /**
   * Переходит на страницу детального просмотра выбранной заявки
   *
   * @param sdRequest - выбранный работник
   */
  redirectToSdRequestPage(sdRequest: SdRequestViewModel) {
    this.router.navigate(['sd-requests', sdRequest.id], { relativeTo: this.route });
  }

  /**
   * Закрывает заявку
   *
   * @param id - номер заявки
   */
  closeSdRequest(id: number) {
    this.confirmationService.confirm({
      header: 'Внимание!',
      message: `Вы действительно хотите закрыть заявку №${id}?`,
      accept: () => this.sdRequestFacade.closeSdRequest(id),
    });
  }
}
