import { Action } from '@ngrx/store';

import { SdRequest } from '../../../entities/sd-request.interface';
import * as SdRequestActions from './sd-request.actions';
import { State, initialState, reducer } from './sd-request.reducer';
import { SdRequestQueueBuilder } from './../../builders/sd-request-queue.builder';

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
      const sdRequestQueue = new SdRequestQueueBuilder().sd_requests(sdRequests).total_count(12).build();
      action = SdRequestActions.loadAllSuccess({ sdRequestQueue });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.totalCount).toEqual(12);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should set "error" attribute', () => {
      const error = { message: 'error' };
      action = SdRequestActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.selectedId).toBeNull();
      expect(result.loading).toEqual(false);
    });
  });

  describe('setPage', () => {
    it('should set "page" attribute', () => {
      action = SdRequestActions.SetPage({ page: 123 });
      const result: State = reducer(initialState, action);

      expect(result.page).toEqual(123);
      expect(result.loaded).toEqual(false);
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
