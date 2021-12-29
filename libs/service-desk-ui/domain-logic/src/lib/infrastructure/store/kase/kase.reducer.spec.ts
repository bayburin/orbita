import { Action } from '@ngrx/store';

import * as KaseActions from './kase.actions';
import { Kase } from './../../../entities/models/kase.interface';
import { State, initialState, reducer } from './kase.reducer';
import { Filter } from '../../../entities/filter.interface';
import { KaseViewForm } from '../../../entities/form/kase-view-form.interface';
import { SvtItem } from '../../../entities/models/svt/svt-item.interface';

describe('KaseReducer', () => {
  let action: Action;
  const createKase = (case_id: number, desc = ''): Kase =>
    ({
      case_id,
      desc: desc || `desc-${case_id}`,
    } as Kase);

  // ========== Список заявок ==========

  describe('init', () => {
    it('should change attributes', () => {
      action = KaseActions.init();
      const result: State = reducer(initialState, action);

      expect(result.initLoading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = KaseActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const kases = [createKase(111), createKase(222)];
      initialState.loading = true;
      action = KaseActions.loadAllSuccess({ kases });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.initLoading).toBe(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      initialState.initLoading = true;
      action = KaseActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
      expect(result.initLoading).toBe(false);
    });
  });

  describe('setStatuses', () => {
    it('should change attributes', () => {
      const statuses = [{ id: 1 }, { id: 2 }] as Filter[];
      action = KaseActions.setStatuses({ statuses });
      const result: State = reducer(initialState, action);

      expect(result.statuses).toEqual(statuses);
    });
  });

  describe('setServiceIds', () => {
    it('should change attributes', () => {
      const serviceIds = [1, 2, 3];
      action = KaseActions.setServiceIds({ serviceIds });
      const result: State = reducer(initialState, action);

      expect(result.serviceIds).toEqual(serviceIds);
    });
  });

  describe('revoke', () => {
    it('should change attributes', () => {
      action = KaseActions.revoke({ caseId: 123 });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
    });
  });

  describe('revokeSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = KaseActions.revokeSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('revokeFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      action = KaseActions.revokeFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('setSelectedStatusId', () => {
    it('should change attributes', () => {
      action = KaseActions.setSelectedStatusId({ selectedStatusId: 12345 });
      const result: State = reducer(initialState, action);

      expect(result.selectedStatusId).toBe(12345);
    });
  });

  describe('vote', () => {
    it('should change attributes', () => {
      action = KaseActions.vote({ caseId: 123, rating: 456 });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
    });
  });

  describe('voteSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = KaseActions.voteSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('voteFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      action = KaseActions.voteFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('loadParamsForNewForm', () => {
    it('should change attributes', () => {
      action = KaseActions.loadParamsForNewForm();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(true);
      expect(result.form.loaded).toBe(false);
    });
  });

  describe('loadParamsForNewFormSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = KaseActions.loadParamsForNewFormSuccess();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(false);
      expect(result.form.loaded).toBe(true);
    });
  });

  describe('loadParamsForNewFormFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      action = KaseActions.loadParamsForNewFormFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(false);
      expect(result.form.loaded).toBe(false);
      expect(result.form.error).toEqual(error);
    });
  });

  describe('setInitialDataToNewForm', () => {
    it('should change attributes', () => {
      const formData = { user_tn: 123 } as KaseViewForm;
      action = KaseActions.setInitialDataToNewForm({ formData });
      const result: State = reducer(initialState, action);

      expect(result.form.entity).toEqual(formData);
    });
  });

  describe('setSvtItems', () => {
    it('should change attributes', () => {
      const svtItems = [{ item_id: 1 }, { item_id: 2 }] as SvtItem[];
      action = KaseActions.setSvtItems({ svtItems });
      const result: State = reducer(initialState, action);

      expect(result.form.svtItems).toEqual(svtItems);
    });
  });

  describe('saveForm', () => {
    it('should change attributes', () => {
      action = KaseActions.saveForm();
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('saveFormSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = KaseActions.saveFormSuccess();
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('saveFormFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      initialState.loading = true;
      action = KaseActions.saveFormFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.loading).toBe(false);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
