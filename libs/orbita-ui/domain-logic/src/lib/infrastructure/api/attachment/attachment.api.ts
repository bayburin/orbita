import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ORBITA_UI_ENV_TOKEN, OrbitaUiEnvironment } from '@orbita/shared/environment';

import { AttachmentApiAbstract } from './attachment.api.abstract';
import { Attachment } from '../../../entities/models/attachment.interface';

/**
 * Содержит API параметров заявок для обращения к серверу
 */
@Injectable({
  providedIn: 'root',
})
export class AttachmentApi implements AttachmentApiAbstract {
  readonly api = `${this.env.serverApiUrl}/claims`;

  constructor(private http: HttpClient, @Inject(ORBITA_UI_ENV_TOKEN) private env: OrbitaUiEnvironment) {}

  download(attachment: Attachment) {
    return this.http.get(`${this.api}/${attachment.claim_id}/attachments/${attachment.id}`, { responseType: 'blob' });
  }
}
