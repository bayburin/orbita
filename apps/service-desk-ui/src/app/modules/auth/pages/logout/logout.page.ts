import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'service-desk-ui-logout-page',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.unauthorize().subscribe();
  }

  /**
   * Заново авторизуется в системе.
   */
  authorize() {
    this.authService.authorize();
  }
}
