import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { SVT_ITEM_FEATURE_KEY, State, initialState } from '../../infrastructure/store/svt-item/svt-item.reducer';
import { TICKET_SYSTEM_FEATURE_KEY } from '../../infrastructure/store/index';
import { SvtFacade } from './svt.facade';
import { SvtItem } from './../../entities/models/svt/svt-item.interface';
import * as SvtItemActions from '../../infrastructure/store/svt-item/svt-item.actions';

interface TestSchema {
  [TICKET_SYSTEM_FEATURE_KEY]: {
    [SVT_ITEM_FEATURE_KEY]: State;
  };
}

describe('SvtFacade', () => {
  let facade: SvtFacade;
  let store: MockStore<TestSchema>;
  const createSvtItemEntity = (id: number, name = '') =>
    ({
      barcode_item: { id },
      lastName: name || `name-${id}`,
    } as unknown as SvtItem);

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

    describe('loadItemsForForm()', () => {
      it('should call loadAllForForm action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.loadItemsForForm({ id_tn: 123 });

        expect(spy).toHaveBeenCalledWith(SvtItemActions.loadAllForForm({ filters: { id_tn: 123 } }));
      });
    });

    describe('removeAllItems()', () => {
      it('should call clearAll action', () => {
        const spy = jest.spyOn(store, 'dispatch');

        facade.removeAllItems();

        expect(spy).toHaveBeenCalledWith(SvtItemActions.clearAll());
      });
    });
  });
});
