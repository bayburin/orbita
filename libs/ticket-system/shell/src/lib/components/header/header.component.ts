import { Component } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user = this.authHelper.getJwtPayload();

  constructor(private authHelper: AuthHelper) {}

  logout(): void {
    this.authHelper.logout();
  }
}
