import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { SVT_ITEM_FEATURE_KEY, State, initialState } from '../../infrastructure/store/svt-item/svt-item.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { SvtFacade } from './svt.facade';
import { SvtItem } from './../../entities/models/svt/svt-item.interface';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [SVT_ITEM_FEATURE_KEY]: State;
  };
}

describe('SvtItemFacade', () => {
  let facade: SvtFacade;
  let store: MockStore<TestSchema>;
  const createItemEntity = (id: number, name = '') =>
    (({
      barcode_item: { id },
      lastName: name || `name-${id}`,
    } as unknown) as SvtItem);

  describe('Unit', () => {
    let actions$: Observable<Action>;
    const state = {
      [TICKET_SYSTEM_FEATURE_KEY]: {
        [SVT_ITEM_FEATURE_KEY]: initialState,
      },
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [SvtFacade, provideMockActions(() => actions$), provideMockStore({ initialState: state })],
      });

      store = TestBed.inject(MockStore);
      facade = TestBed.inject(SvtFacade);
    });

    it('', () => {
      /**  */
    });
  });
});
