import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'service-desk-ui-unauthorized-page',
  templateUrl: './unauthorized.page.html',
  styleUrls: ['./unauthorized.page.sass'],
})
export class UnauthorizedPageComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.clearAuthData();
  }

  /**
   * Заново авторизуется в системе.
   */
  authorize() {
    this.authService.authorize();
  }
}
