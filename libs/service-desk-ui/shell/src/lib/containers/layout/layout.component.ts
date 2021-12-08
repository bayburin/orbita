import { Component } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

import { routeAnimation } from '@orbita/service-desk-ui/ui';
import { User } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'service-desk-ui-shell-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [routeAnimation],
})
export class LayoutComponent {
  get user(): User {
    return this.authHelper.getJwtPayload();
  }

  constructor(private authHelper: AuthHelper) {}
}
