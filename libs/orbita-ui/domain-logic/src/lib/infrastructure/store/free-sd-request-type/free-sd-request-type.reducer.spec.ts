import { Action } from '@ngrx/store';

import { FreeSdRequestType } from '../../../entities/models/sd/free-sd-request-type.interface';
import * as FreeSdRequestTypeActions from './free-sd-request-type.actions';
import { State, initialState, reducer } from './free-sd-request-type.reducer';

describe('FreeSdRequestTypeReducer', () => {
  let action: Action;
  const createFreeSdRequestType = (id: string, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as FreeSdRequestType);

  describe('loadAll', () => {
    it('should clear "loaded" and "error" attributes', () => {
      action = FreeSdRequestTypeActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should return set the list of known SdRequest', () => {
      const freeSdRequestTypes = [
        createFreeSdRequestType('PRODUCT-AAA'),
        createFreeSdRequestType('PRODUCT-zzz'),
      ];
      action = FreeSdRequestTypeActions.loadAllSuccess({ freeSdRequestTypes });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" attribute', () => {
      const error = { message: 'error' };
      action = FreeSdRequestTypeActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
