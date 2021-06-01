import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { WorkFacade } from './work.facade';
import * as WorkActions from '../../infrastructure/store/work/work.actions';
import {
  WORK_FEATURE_KEY,
  initialState,
} from '../../infrastructure/store/work/work.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { Work } from '../../entities/models/work.interface';

describe('WorkFacade', () => {
  let facade: WorkFacade;
  let store: MockStore;
  let actions$: Observable<Action>;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [WORK_FEATURE_KEY]: initialState,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkFacade,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: state }),
      ],
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(WorkFacade);
  });

  describe('setWorks()', () => {
    it('should call init() action', () => {
      const works = [{ id: 1 } as Work, { id: 2 } as Work];
      spyOn(store, 'dispatch');
      facade.setWorks(works);

      expect(store.dispatch).toHaveBeenCalledWith(
        WorkActions.setAll({ works })
      );
    });
  });
});
