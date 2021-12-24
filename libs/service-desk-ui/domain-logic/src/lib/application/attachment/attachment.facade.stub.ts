import { BehaviorSubject } from 'rxjs';

import { AttachmentFacadeAbstract } from './attachment.facade.abstract';

export class AttachmentFacadeStub implements AttachmentFacadeAbstract {
  loadingIds$ = new BehaviorSubject([]);
  errorIds$ = new BehaviorSubject([]);

  download() {
    /** */
  }
}
