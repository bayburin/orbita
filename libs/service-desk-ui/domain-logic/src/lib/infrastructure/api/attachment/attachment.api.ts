import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVICE_DESK_UI_ENV_TOKEN, ServiceDeskUiEnvironment } from '@orbita/shared/environment';

import { AttachmentApiAbstract } from './attachment.api.abstract';

/**
 * Содержит API параметров заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class AttachmentApi implements AttachmentApiAbstract {
  readonly api = `${this.env.serverUrl}/answers`;

  constructor(private http: HttpClient, @Inject(SERVICE_DESK_UI_ENV_TOKEN) private env: ServiceDeskUiEnvironment) {}

  download(id: number, answerId: number) {
    return this.http.get(`${this.api}/${answerId}/answer_attachments/${id}`, { responseType: 'blob' });
  }
}
