import { Component } from '@angular/core';

import { TmpNotification, NotificationFacade } from '@orbita/service-desk-ui/domain-logic';
import { routeAnimation } from '@orbita/service-desk-ui/ui';

@Component({
  selector: 'service-desk-ui-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimation],
})
export class LayoutComponent {
  tmpNotifications$ = this.notificationFacade.tmpNotifications$;

  constructor(private notificationFacade: NotificationFacade) {}

  /**
   * Удаляет всплывающее уведомление
   *
   * @param notification - уведомление
   */
  removeTmpNotification(notification: TmpNotification): void {
    this.notificationFacade.removeTmpNotification(notification);
  }
}
