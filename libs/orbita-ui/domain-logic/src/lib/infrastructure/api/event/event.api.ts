import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { Event } from '../../../entities/models/event.interface';
import { DefaultServerResponse } from './../../../entities/server-data/default-server-response.interface';
import { EventApiAbstract } from './event.api.abstract';

/**
 * Содержит API заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class EventApi implements EventApiAbstract {
  readonly api = `${this.env.serverApiUrl}/events`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  create(event: Event) {
    return this.http.post<DefaultServerResponse>(this.api, { event });
  }
}
