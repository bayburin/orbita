import { Action } from '@ngrx/store';

import { State, initialState, reducer } from './user-recommendation.reducer';
import { UserRecommendation } from '../../../entities/models/user-recommendation.interface';
import { UserRecommendationFactory } from './../../factories/user-recommendation.factory';
import { UserRecommendationViewForm } from '../../../entities/form/user-recommendation-view-form.interface';
import * as UserRecommendationActions from './user-recommendation.actions';

describe('UserRecommendationReducer', () => {
  let action: Action;
  const createUserRecommendation = (id: number, name = ''): UserRecommendation =>
    ({
      id,
      link: name || `name-${id}`,
    } as UserRecommendation);

  describe('setAll', () => {
    it('should change attributes', () => {
      const recommendations = [createUserRecommendation(111), createUserRecommendation(222)];
      action = UserRecommendationActions.setAll({ recommendations });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
    });
  });

  describe('loadAll', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.loadAll();
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadAllSuccess', () => {
    it('should change attributes', () => {
      const recommendations = [createUserRecommendation(111), createUserRecommendation(222)];
      initialState.loading = true;
      action = UserRecommendationActions.loadAllSuccess({ recommendations });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(2);
      expect(result.loading).toEqual(false);
      expect(result.loaded).toBe(true);
    });
  });

  describe('loadAllFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = UserRecommendationActions.loadAllFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.loading).toEqual(false);
    });
  });

  describe('select', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.select({ id: 1 });
      const result: State = reducer(initialState, action);

      expect(result.selectedId).toBe(1);
    });
  });

  describe('loadSelected', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.loadSelected({ edit: true });
      const result: State = reducer(initialState, action);

      expect(result.selectedLoading).toBe(true);
      expect(result.error).toBeNull();
    });
  });

  describe('loadSelectedSuccess', () => {
    it('should change attributes', () => {
      const recommendation = createUserRecommendation(1);
      action = UserRecommendationActions.loadSelectedSuccess({ recommendation, edit: true });
      const result: State = reducer(initialState, action);

      expect(result.ids.length).toBe(1);
      expect(result.selectedLoading).toBe(false);
    });
  });

  describe('loadSelectedFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = UserRecommendationActions.loadSelectedFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.error).toEqual(error);
      expect(result.selectedLoading).toBe(false);
    });
  });

  // ========== Форма рекомендаций для пользователя ==========

  describe('initForm', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.initForm({});
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(UserRecommendationFactory.createViewForm());
      expect(result.form.displayForm).toBe(true);
    });
  });

  describe('closeForm', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.closeForm();
      const result: State = reducer(initialState, action);

      expect(result.form.displayForm).toBe(false);
    });
  });

  describe('changeForm', () => {
    it('should change attributes', () => {
      const formData = { title: 'newTitle' } as UserRecommendationViewForm;
      action = UserRecommendationActions.changeForm({ formData });
      const result: State = reducer(initialState, action);

      expect(result.form.formData).toEqual(formData);
    });
  });

  describe('saveForm', () => {
    it('should change attributes', () => {
      action = UserRecommendationActions.saveForm();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(true);
      expect(result.form.error).toBe(null);
    });
  });

  describe('saveFormSuccess', () => {
    it('should change attributes', () => {
      initialState.form.formData = { title: 'newTitle' } as UserRecommendationViewForm;
      action = UserRecommendationActions.saveFormSuccess();
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(false);
      expect(result.form.formData).toBeNull();
    });
  });

  describe('saveFormFailure', () => {
    it('should change attributes', () => {
      const error = { message: 'error' };
      action = UserRecommendationActions.saveFormFailure({ error });
      const result: State = reducer(initialState, action);

      expect(result.form.loading).toBe(false);
      expect(result.form.error).toEqual(error);
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
