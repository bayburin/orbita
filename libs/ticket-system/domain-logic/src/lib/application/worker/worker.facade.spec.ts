import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';

import { WorkerFacade } from './worker.facade';
import * as WorkerActions from '../../infrastructure/store/worker/worker.actions';
import { WORKER_FEATURE_KEY, initialState } from '../../infrastructure/store/worker/worker.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { Worker } from '../../entities/models/worker.interface';

describe('WorkerFacade', () => {
  let facade: WorkerFacade;
  let store: MockStore;
  let actions$: Observable<Action>;
  const state = {
    [TICKET_SYSTEM_FEATURE_KEY]: {
      [WORKER_FEATURE_KEY]: initialState
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WorkerFacade,
        provideMockActions(() => actions$),
        provideMockStore({ initialState: state }),
      ]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(WorkerFacade);
  });

  describe('setWorkers()', () => {
    it('should call init() action', () => {
      const workers = [
        { id: 1 } as Worker,
        { id: 2 } as Worker
      ];
      spyOn(store, 'dispatch');
      facade.setWorkers(workers);

      expect(store.dispatch).toHaveBeenCalledWith(WorkerActions.setAll({ workers }));
    });
  });
});
