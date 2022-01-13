import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { TmpNotification, NotificationFacade, RouterFacade, AppFacade } from '@orbita/service-desk-ui/domain-logic';
import { routeAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'service-desk-ui-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimation],
})
export class LayoutComponent implements OnInit, OnDestroy {
  tmpNotifications$ = this.notificationFacade.tmpNotifications$;
  subscriptions = new Subscription();
  needShowBreadcrumb$ = this.routerFacade.needShowBreadcrumb$;
  loaded$ = this.appFacade.loaded$;
  loading$ = this.appFacade.loading$;
  error$ = this.appFacade.error$;
  serverDate$ = this.appFacade.serverDate$;

  constructor(
    private appFacade: AppFacade,
    private notificationFacade: NotificationFacade,
    private routerFacade: RouterFacade
  ) {}

  ngOnInit(): void {
    this.appFacade.init();
    this.appFacade.initVersionChecking();
    this.subscriptions.add(this.notificationFacade.connectToUserNotifications());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Удаляет всплывающее уведомление
   *
   * @param notification - уведомление
   */
  removeTmpNotification(notification: TmpNotification): void {
    this.notificationFacade.removeTmpNotification(notification);
  }
}
