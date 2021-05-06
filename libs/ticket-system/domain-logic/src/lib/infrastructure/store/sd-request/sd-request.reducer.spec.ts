import { Action } from '@ngrx/store';

import { SdRequest } from '../../../entities/sd-request.interface';
import * as SdRequestActions from './sd-request.actions';
import { State, initialState, reducer } from './sd-request.reducer';

describe('SdRequestReducer', () => {
  let action: Action;
  const createSdRequest = (id: string, name = '') =>
    ({
      id, name:
      name || `name-${id}`
    } as unknown as SdRequest);

    describe('loadAll', () => {
      it('should clear "loaded" and "error" attributes', () => {
        action = SdRequestActions.loadAll();
        const result: State = reducer(initialState, action);

        expect(result.loaded).toBe(false);
        expect(result.error).toBeNull();
      });
    });

    describe('loadAllSuccess', () => {
      it('should return set the list of known SdRequest', () => {
        const sdRequests = [
          createSdRequest('PRODUCT-AAA'),
          createSdRequest('PRODUCT-zzz'),
        ];
        const sdRequestQueue = {
          sd_requests: sdRequests,
          meta: {
            current_page: 1,
            total_pages: 2,
            total_count: 3
          }
        }
        action = SdRequestActions.loadAllSuccess({ sdRequestQueue });
        const result: State = reducer(initialState, action);

        expect(result.loaded).toBe(true);
        expect(result.ids.length).toBe(2);
      });
    });

    describe('loadAllFailure', () => {
      it('should set "error" attribute', () => {
        const error = { message: 'error' };
        action = SdRequestActions.loadAllFailure({ error });
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
