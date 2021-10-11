import { of } from 'rxjs';

import { AttachmentApiAbstract } from './attachment.api.abstract';

export class AttachmentApiStub implements AttachmentApiAbstract {
  api = '';

  download() {
    return of(new Blob());
  }
}
