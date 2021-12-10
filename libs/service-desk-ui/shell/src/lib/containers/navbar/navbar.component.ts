import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

import { userDashboardAnimation } from '@orbita/service-desk-ui/ui';
import { User, NotificationFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [userDashboardAnimation],
})
export class NavbarComponent implements OnInit {
  user: User = this.authHelper.getJwtPayload();
  notifications$ = this.notificationFacade.notifications$;
  notificationsLoading$ = this.notificationFacade.notificationsLoading$;
  notificationsLoaded$ = this.notificationFacade.notificationsLoaded$;
  userProfile = false;

  constructor(private authHelper: AuthHelper, private notificationFacade: NotificationFacade) {}

  ngOnInit(): void {
    this.notificationFacade.loadAllNotifications();
  }

  toggleNotificationLimit() {
    this.notificationFacade.toggleNotificationVisibleLimit();
  }
}
