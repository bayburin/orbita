import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { MessageFacade } from './message.facade';
import * as MessageActions from '../../infrastructure/store/message/message.actions';
import { MESSAGE_FEATURE_KEY, initialState } from '../../infrastructure/store/message/message.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { StreamService } from '../../infrastructure/stream/stream.service';
import { StreamServiceStub } from './../../infrastructure/stream/stream.service.stub';

describe('MessageFacade', () => {
  let facade: MessageFacade;
  let store: MockStore;
  let actions$: Observable<Action>;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [MESSAGE_FEATURE_KEY]: initialState,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageFacade,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: state }),
        { provide: StreamService, useClass: StreamServiceStub },
      ],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(MessageFacade);
  });

  describe('createComment()', () => {
    it('should call createComment action', () => {
      const spy = jest.spyOn(store, 'dispatch');

      facade.createComment(10, 'test');

      expect(spy).toHaveBeenCalledWith(MessageActions.createComment({ ticketId: 10, message: 'test' }));
    });
  });
});
