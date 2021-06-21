import { Action } from '@ngrx/store';

import { SdRequest } from '../../../entities/models/sd-request.interface';
import { Meta } from '../../../entities/server-data/meta.interface';
import * as SdRequestActions from './sd-request.actions';
import { State, initialState, reducer } from './sd-request.reducer';

describe('SdRequestReducer', () => {
  let action: Action;
  const createSdRequest = (id: string, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as SdRequest);

  describe('loadAll', () => {
    it('should clear "loading" and "error" attributes', () => {
      action = SdRequestActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.needTickets).toBe(false);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should return set the list of known SdRequest', () => {
      const sdRequests = [createSdRequest('PRODUCT-AAA'), createSdRequest('PRODUCT-zzz')];
      const meta = {
        total_count: 12,
      } as Meta;
      action = SdRequestActions.loadAllSuccess({ sdRequests, meta });
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

  describe('setTableMetadata', () => {
    const data = {
      first: 4,
      rows: 2,
      sortField: 'id',
      sortOrder: -1,
      filters: {},
    };

    it('should set "page" attribute', () => {
      action = SdRequestActions.SetTableMetadata({ data });
      const result: State = reducer(initialState, action);

      expect(result.firstRowIndex).toEqual(data.first);
      expect(result.perPage).toEqual(data.rows);
      expect(result.sortField).toEqual(data.sortField);
      expect(result.sortOrder).toEqual(data.sortOrder);
      expect(result.filters).toEqual(data.filters);
      expect(result.loaded).toEqual(false);
      expect(result.needTickets).toEqual(true);
    });
  });

  describe('ReloadEntities', () => {
    it('should set "needTickets" attribute', () => {
      action = SdRequestActions.ReloadEntities();
      const result: State = reducer(initialState, action);

      expect(result.needTickets).toEqual(true);
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
