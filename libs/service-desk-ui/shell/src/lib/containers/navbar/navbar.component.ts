import { Component, OnInit } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

import { userDashboardAnimation } from '@orbita/service-desk-ui/ui';
import { User, UserFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [userDashboardAnimation],
})
export class NavbarComponent implements OnInit {
  user: User = this.authHelper.getJwtPayload();
  notifications$ = this.userFacade.notifications$;
  notificationsLoading$ = this.userFacade.notificationsLoading$;
  notificationsLoaded$ = this.userFacade.notificationsLoaded$;
  userDashboard = false;

  constructor(private authHelper: AuthHelper, private userFacade: UserFacade) {}

  ngOnInit(): void {
    this.userFacade.loadAllNotifications();
  }

  toggleNotificationLimit() {
    this.userFacade.toggleNotificationVisibleLimit();
  }
}
