import { Action } from '@ngrx/store';

import { SdRequest } from '../../../entities/models/sd-request.interface';
import { Meta } from '../../../entities/server-data/meta.interface';
import * as SdRequestActions from './sd-request.actions';
import { State, initialState, reducer, SelectedState, FormState } from './sd-request.reducer';
import { SdRequestFormBuilder } from './../../builders/sd-request-form.builder';
import { SdRequestForm } from './../../../entities/forms/sd-request-form.interface';

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
    it('should set attributes', () => {
      const error = { message: 'error' };
      action = SdRequestActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
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

    it('should set attributes', () => {
      action = SdRequestActions.SetTableMetadata({ data });
      const result: State = reducer(initialState, action);

      expect(result.firstRowIndex).toEqual(data.first);
      expect(result.perPage).toEqual(data.rows);
      expect(result.sortField).toEqual(data.sortField);
      expect(result.sortOrder).toEqual(data.sortOrder);
      expect(result.filters).toEqual(data.filters);
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

  describe('loadSelected', () => {
    it('should set attributes', () => {
      action = SdRequestActions.loadSelected();
      const result: SelectedState = reducer(initialState, action).selected;

      expect(result.entity).toBeNull();
      expect(result.skeleton).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should set attributes', () => {
      const sdRequest = createSdRequest('AAA');
      action = SdRequestActions.loadSelectedSuccess({ sdRequest });
      const result: SelectedState = reducer(initialState, action).selected;

      expect(result.entity).toEqual(sdRequest);
      expect(result.skeleton).toBe(false);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should set attributes', () => {
      const error = 'fake-error';
      action = SdRequestActions.loadSelectedFailure({ error });
      const result: SelectedState = reducer(initialState, action).selected;

      expect(result.skeleton).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('clearSelected', () => {
    it('should set attributes', () => {
      const sdRequest = createSdRequest('AAA');
      action = SdRequestActions.loadSelectedSuccess({ sdRequest });
      const tmpResult: State = reducer(initialState, action);
      action = SdRequestActions.clearSelected();
      const result: SelectedState = reducer(tmpResult, action).selected;

      expect(result.entity).toBeNull();
    });
  });

  describe('toggleSelectedEditMode', () => {
    it('should set attributes', () => {
      action = SdRequestActions.toggleSelectedEditMode();
      const result: SelectedState = reducer(initialState, action).selected;

      expect(result.editMode).toBe(true);
    });
  });

  describe('initUpdateForm', () => {
    it('should set attributes', () => {
      const sdRequest = createSdRequest('PRODUCT-AAA');
      const form = { id: 111 };
      spyOn(SdRequestFormBuilder, 'build').and.returnValue(form);
      action = SdRequestActions.initUpdateForm({ sdRequest });
      const result: FormState = reducer(initialState, action).form;

      expect(result.entity).toEqual(form);
    });
  });

  describe('changeForm', () => {
    it('should set attributes', () => {
      const form = { id: 111 } as SdRequestForm;
      action = SdRequestActions.changeForm({ entity: form });
      const result: FormState = reducer(initialState, action).form;

      expect(result.entity).toEqual(form);
    });
  });

  describe('saveUpdateForm', () => {
    it('should set attributes', () => {
      action = SdRequestActions.saveUpdateForm();
      const result: FormState = reducer(initialState, action).form;

      expect(result.loading).toBe(true);
    });
  });

  describe('saveFormSuccess', () => {
    it('should set attributes', () => {
      const sdRequest = { id: 456 } as SdRequest;
      action = SdRequestActions.saveFormSuccess({ sdRequest });
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(false);
      expect(result.selected.entity).toEqual(sdRequest);
    });
  });

  describe('saveFormFailure', () => {
    it('should set attributes', () => {
      const error = 'fake-error';
      action = SdRequestActions.saveFormFailure({ error });
      const result: FormState = reducer(initialState, action).form;

      expect(result.loading).toBe(false);
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
