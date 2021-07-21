import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { AttachmentFacade } from './attachment.facade';
import * as AttachmentActions from '../../infrastructure/store/attachment/attachment.actions';
import { ATTACHMENT_FEATURE_KEY, initialState } from '../../infrastructure/store/attachment/attachment.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { Attachment } from '../../entities/models/attachment.interface';

describe('AttachmentFacade', () => {
  let facade: AttachmentFacade;
  let store: MockStore;
  let actions$: Observable<Action>;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [ATTACHMENT_FEATURE_KEY]: initialState,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AttachmentFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(AttachmentFacade);
  });

  describe('download()', () => {
    it('should call download() action', () => {
      const attachment = { id: 1, claim_id: 2 } as Attachment;
      jest.spyOn(store, 'dispatch');

      facade.download(attachment);

      expect(store.dispatch).toHaveBeenCalledWith(AttachmentActions.download({ attachment }));
    });
  });
});
