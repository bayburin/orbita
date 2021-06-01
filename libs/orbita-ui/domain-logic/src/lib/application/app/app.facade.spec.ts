import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { AppFacade } from './app.facade';
import * as AppActions from '../../infrastructure/store/app/app.actions';
import {
  APP_FEATURE_KEY,
  initialState,
} from '../../infrastructure/store/app/app.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';

describe('AppFacade', () => {
  let facade: AppFacade;
  let store: MockStore;
  let actions$: Observable<Action>;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [APP_FEATURE_KEY]: initialState,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppFacade,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: state }),
      ],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(AppFacade);
  });

  describe('init()', () => {
    it('should call init() action', () => {
      spyOn(store, 'dispatch');
      facade.init();

      expect(store.dispatch).toHaveBeenCalledWith(AppActions.init());
    });
  });
});
