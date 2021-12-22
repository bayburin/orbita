import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { QuestionApiAbstract } from './question.api.abstract';

/**
 * Содержит API категорий
 */
@Injectable({
  providedIn: 'root',
})
export class QuestionApi implements QuestionApiAbstract {
  readonly api = this.env.serverUrl;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  upRating(ticketId: number, serviceId: number) {
    const api = `${this.api}/services/${serviceId}/questions/${ticketId}/raise_rating`;

    return this.http.post<void>(api, {});
  }
}
