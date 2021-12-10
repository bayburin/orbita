import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';
import { Subscription } from 'rxjs';

import { userDashboardAnimation } from '@orbita/service-desk-ui/ui';
import { User, NotificationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [userDashboardAnimation],
})
export class NavbarComponent implements OnInit, OnDestroy {
  user: User = this.authHelper.getJwtPayload();
  notifications$ = this.notificationFacade.notifications$;
  notificationsLoading$ = this.notificationFacade.loading$;
  notificationsLoadingNew$ = this.notificationFacade.loadingNew$;
  notificationsLoaded$ = this.notificationFacade.loaded$;
  unreadNotificationCount$ = this.notificationFacade.unreadNotificationCount$;
  notificationLimitType$ = this.notificationFacade.limitType$;
  subscriptions = new Subscription();
  private _userProfile = false;

  get userProfile(): boolean {
    return this._userProfile;
  }

  set userProfile(value: boolean) {
    this._userProfile = value;

    if (value) {
      this.notificationFacade.loadAllNotifications();
    }
  }

  constructor(private authHelper: AuthHelper, private notificationFacade: NotificationFacade) {}

  ngOnInit(): void {
    this.subscriptions.add(this.notificationFacade.connectToNotificationCountChannel());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Переключить число выводимых уведомлений
   */
  toggleNotificationLimit(): void {
    this.notificationFacade.toggleNotificationLimitType();
  }

  /**
   * Загрузить непрочитанные уведомления
   */
  loadNewNotification(): void {
    this.notificationFacade.loadNewNotifications();
  }
}
