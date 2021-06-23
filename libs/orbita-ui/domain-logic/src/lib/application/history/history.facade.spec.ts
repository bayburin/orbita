import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { HistoryFacade } from './history.facade';
import * as HistoryActions from '../../infrastructure/store/history/history.actions';
import { HISTORY_FEATURE_KEY, initialState } from '../../infrastructure/store/history/history.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { History } from '../../entities/models/history.interface';

describe('HistoryFacade', () => {
  let facade: HistoryFacade;
  let store: MockStore;
  let actions$: Observable<Action>;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [HISTORY_FEATURE_KEY]: initialState,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(HistoryFacade);
  });

  describe('replaceAllHistories()', () => {
    it('should call setAll() action', () => {
      const histories = [{ id: 1 } as History, { id: 2 } as History];
      spyOn(store, 'dispatch');
      facade.replaceAllHistories(histories);

      expect(store.dispatch).toHaveBeenCalledWith(HistoryActions.setAll({ histories }));
    });
  });

  describe('setHistories()', () => {
    it('should call setHistories() action', () => {
      const histories = [{ id: 1 } as History, { id: 2 } as History];
      spyOn(store, 'dispatch');
      facade.setHistories(histories);

      expect(store.dispatch).toHaveBeenCalledWith(HistoryActions.setHistories({ histories }));
    });
  });
});
