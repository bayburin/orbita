import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { ServiceDeskApiAbstract } from './service-desk.api.abstract';
import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

/**
 * Содержит API заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class ServiceDeskApi implements ServiceDeskApiAbstract {
  readonly api = `${this.env.serviceDeskApi}/v2`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  getTickets() {
    return this.http.get<SdTicket[]>(`${this.api}/tickets`);
  }

  getTicket(ticketIdentity: number) {
    return this.http.get<SdTicket>(`${this.api}/tickets/identity/${ticketIdentity}`);
  }
}
