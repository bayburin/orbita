import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AttachmentFeature from '../../infrastructure/store/attachment/attachment.reducer';
import * as AttachmentActions from '../../infrastructure/store/attachment/attachment.actions';
import * as AttachmentSelectors from '../../infrastructure/store/attachment/attachment.selectors';
import { Attachment } from '../../entities/model/attachment.interface';
import { AttachmentFacadeAbstract } from './attachment.facade.abstract';

/**
 * Фасад для работы с прикрепленными файлами
 */
@Injectable({
  providedIn: 'root',
})
export class AttachmentFacade implements AttachmentFacadeAbstract {
  loadingIds$ = this.store.select(AttachmentSelectors.getLoadingIds);
  errorIds$ = this.store.select(AttachmentSelectors.getErrorIds);

  constructor(private store: Store<AttachmentFeature.AttachmentPartialState>) {}

  download(attachment: Attachment) {
    this.store.dispatch(AttachmentActions.download({ attachment }));
  }
}
