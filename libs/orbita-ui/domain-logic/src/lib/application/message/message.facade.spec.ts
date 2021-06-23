import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { MessageFacade } from './message.facade';
import * as MessageActions from '../../infrastructure/store/message/message.actions';
import { MESSAGE_FEATURE_KEY, initialState } from '../../infrastructure/store/message/message.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { Message } from '../../entities/models/message.interface';

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
      providers: [MessageFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(MessageFacade);
  });

  describe('replaceAllMessages()', () => {
    it('should call init() action', () => {
      const messages = [{ id: 1 } as Message, { id: 2 } as Message];
      spyOn(store, 'dispatch');
      facade.replaceAllMessages(messages);

      expect(store.dispatch).toHaveBeenCalledWith(MessageActions.setAll({ messages }));
    });
  });

  describe('setMessages()', () => {
    it('should call setMessages() action', () => {
      const messages = [{ id: 1 } as Message, { id: 2 } as Message];
      spyOn(store, 'dispatch');
      facade.setMessages(messages);

      expect(store.dispatch).toHaveBeenCalledWith(MessageActions.setMessages({ messages }));
    });
  });
});
