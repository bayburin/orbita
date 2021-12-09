import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { Notification } from '../../../entities/model/notification.interface';
import { UserApiAbstract } from './user.api.abstract';

/**
 * Содержит API пользователя
 */
@Injectable({
  providedIn: 'root',
})
export class UserApi implements UserApiAbstract {
  readonly api = `${this.env.serverUrl}/users`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  loadNotifications() {
    return this.http.get<Notification[]>(`${this.api}/notifications`);
  }

  loadNewNotifications() {
    return this.http.get<Notification[]>(`${this.api}/new_notifications`);
  }
}
