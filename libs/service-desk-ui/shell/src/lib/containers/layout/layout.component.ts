import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import { TmpNotification, NotificationFacade } from '@orbita/service-desk-ui/domain-logic';
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
  location = this.router.url;

  constructor(private notificationFacade: NotificationFacade, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions.add(this.notificationFacade.connectToUserNotifications());
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => (this.location = event.urlAfterRedirects.split('?')[0]));
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
