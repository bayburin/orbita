import { Action } from '@ngrx/store';

import { SdRequestViewForm } from './../../../entities/forms/sd-request-view-form.interface';
import { SdRequestFactory } from './../../factories/sd-request.factory';
import { SdRequest } from '../../../entities/models/sd-request.interface';
import { Meta } from '../../../entities/server-data/meta.interface';
import * as SdRequestActions from './sd-request.actions';
import {
  State,
  initialState,
  reducer,
  SelectedState,
  FormState,
  NewFormState,
  initNewFormState,
} from './sd-request.reducer';
import { SdRequestViewModel } from './../../../entities/view-models/sd-request-view-model.interface';
import { NewSdRequestViewForm } from './../../../entities/forms/new-sd-request-view-form.interface';
import { EmployeeShort } from './../../../entities/models/employee/employee-short.interface';
import { SvtItem } from '../../../entities/models/svt/svt-item.interface';

describe('SdRequestReducer', () => {
  let action: Action;
  const createSdRequest = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as SdRequest);
  const createSdRequestViewModel = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as unknown as SdRequestViewModel);

  describe('loadAll', () => {
    it('should clear "loading" and "error" attributes', () => {
      action = SdRequestActions.loadAll({ data: {} });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
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

  describe('disableSelectedEditMode', () => {
    it('should set attributes', () => {
      action = SdRequestActions.toggleSelectedEditMode();
      const tmpResult: State = reducer(initialState, action);
      action = SdRequestActions.toggleSelectedEditMode();
      const result: SelectedState = reducer(tmpResult, action).selected;

      expect(result.editMode).toBe(false);
    });
  });

  describe('initUpdateForm', () => {
    it('should set attributes', () => {
      const sdRequestViewModel = createSdRequestViewModel('PRODUCT-AAA');
      const form = { id: 111 } as SdRequestViewForm;
      jest.spyOn(SdRequestFactory, 'createViewForm').mockReturnValue(form);
      action = SdRequestActions.initUpdateForm({ sdRequestViewModel });
      const result: FormState = reducer(initialState, action).form;

      expect(result.entity).toEqual(form);
    });
  });

  describe('changeForm', () => {
    it('should set attributes', () => {
      const sdRequest = { id: 456 } as SdRequest;
      action = SdRequestActions.saveFormSuccess({ sdRequest });
      const state: State = reducer(initialState, action);

      const dateStr = '2021-06-28T13:00:00+07:00';
      const date = new Date('2021-06-28T13:00:00+07:00');
      const sourceForm = { id: 111, finished_at_plan: date } as SdRequestViewForm;
      const targetForm = { id: 111, finished_at_plan: dateStr } as SdRequestViewForm;
      action = SdRequestActions.changeForm({ entity: sourceForm });
      const result: FormState = reducer(state, action).form;

      expect(result.entity).toEqual(targetForm);
      expect(result.updateView).toBe(false);
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
      expect(result.form.updateView).toBe(true);
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

  describe('setEmployeeToNewForm', () => {
    it('should set attributes', () => {
      const employee = { id: 123 } as EmployeeShort;
      action = SdRequestActions.setEmployeeToNewForm({ employee });
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.entity.employee).toEqual(employee);
    });
  });

  describe('setSvtItemToNewForm', () => {
    it('should set attributes', () => {
      const svtItem = { item_id: 123 } as SvtItem;
      action = SdRequestActions.setSvtItemToNewForm({ svtItem });
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.entity.svtItem).toEqual(svtItem);
    });
  });

  describe('changeNewForm', () => {
    it('should set attributes', () => {
      const form = { description: 'test' } as NewSdRequestViewForm;
      action = SdRequestActions.changeNewForm({ entity: form });
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.entity).toEqual(form);
    });
  });

  describe('saveNewForm', () => {
    it('should set attributes', () => {
      action = SdRequestActions.saveNewForm();
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.loading).toBe(true);
    });
  });

  describe('saveNewFormSuccess', () => {
    it('should set attributes', () => {
      const sdRequest = createSdRequest('AAA');
      action = SdRequestActions.saveNewFormSuccess({ sdRequest });
      const result: State = reducer(initialState, action);

      expect(result.newForm.loading).toBe(false);
      expect(result.newForm.created).toEqual(sdRequest);
    });
  });

  describe('saveNewFormFailure', () => {
    it('should set attributes', () => {
      const error = 'fake-error';
      action = SdRequestActions.saveNewFormFailure({ error });
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.loading).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('showModalAfterCreateNewForm', () => {
    it('should set attributes', () => {
      action = SdRequestActions.showModalAfterCreateNewForm();
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.showModalAfterCreate).toBe(true);
    });
  });

  describe('closeModalAfterCreateNewForm', () => {
    it('should set attributes', () => {
      action = SdRequestActions.closeModalAfterCreateNewForm();
      const result: NewFormState = reducer(initialState, action).newForm;

      expect(result.showModalAfterCreate).toBe(false);
    });
  });

  describe('clearNewForm', () => {
    it('should set attributes', () => {
      const form = { description: 'test' } as NewSdRequestViewForm;
      action = SdRequestActions.changeNewForm({ entity: form });
      const state: State = reducer(initialState, action);
      action = SdRequestActions.clearNewForm();
      const result: NewFormState = reducer(state, action).newForm;

      expect(result).toEqual(initNewFormState);
    });
  });

  describe('update', () => {
    it('should set attributes', () => {
      const sdRequests = [createSdRequest('PRODUCT-AAA'), createSdRequest('PRODUCT-zzz')];
      const meta = { total_count: 12 } as Meta;
      action = SdRequestActions.loadAllSuccess({ sdRequests, meta });
      let result: State = reducer(initialState, action);
      action = SdRequestActions.update({ sdRequest: { id: 'PRODUCT-zzz', name: 'foo' } as unknown as SdRequest });
      result = reducer(result, action);

      expect((result.entities['PRODUCT-zzz'] as any).name).toBe('foo');
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
