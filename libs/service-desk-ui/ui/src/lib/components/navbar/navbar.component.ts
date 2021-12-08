import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /**
   * Данные о пользователе
   */
  @Input() user: User;
  userDashboard = false;
}
