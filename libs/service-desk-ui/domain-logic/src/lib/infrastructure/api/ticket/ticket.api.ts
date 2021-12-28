import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { TicketApiAbstract } from './ticket.api.abstract';
import { Ticket } from '../../../entities/models/ticket.interface';

/**
 * Содержит API тикетов
 */
@Injectable({
  providedIn: 'root',
})
export class TicketApi implements TicketApiAbstract {
  readonly api = `${this.env.serverUrl}/tickets`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  show(identity: number) {
    const api = `${this.api}/${identity}`;

    return this.http.get<Ticket>(api);
  }
}
