import { BehaviorSubject } from 'rxjs';

import { AttachmentFacadeAbstract } from './attachment.facade.abstract';
import { Attachment } from '../../entities/models/attachment.interface';

export class AttachmentFacadeStub implements AttachmentFacadeAbstract {
  loadingIds$ = new BehaviorSubject([]);
  errorIds$ = new BehaviorSubject([]);

  download(attachment: Attachment) {
    /** */
  }
}
