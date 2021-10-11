import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { CommentApiAbstract } from './comment.api.abstract';
import { DefaultServerResponse } from './../../../entities/server-data/default-server-response.interface';

/**
 * Содержит API заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class CommentApi implements CommentApiAbstract {
  readonly api = `${this.env.serverApiUrl}/claims`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  create(ticketId: number, message: string) {
    return this.http.post<DefaultServerResponse>(`${this.api}/${ticketId}/comments`, { message });
  }
}
