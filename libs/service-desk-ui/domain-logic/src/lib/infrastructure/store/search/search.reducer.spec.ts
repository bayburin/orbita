import { Action } from '@ngrx/store';

import * as SearchActions from './search.actions';
import { Category } from './../../../entities/model/category.interface';
import { Service } from './../../../entities/model/service.interface';
import { Question } from './../../../entities/model/question.interface';
import { State, initialState, reducer } from './search.reducer';
import { ResponsibleUser } from '../../../entities/model/responsible-user.interface';

describe('SearchReducer', () => {
  let action: Action;
  const createCategory = (id: number, name = ''): Category =>
    ({
      id,
      name: name || `name-${id}`,
    } as Category);
  const createService = (id: number, name = ''): Service =>
    ({
      id,
      name: name || `name-${id}`,
    } as Service);
  const createQuestion = (id: number, name = ''): Question =>
    ({
      id,
      ticket: { name: name || `name-${id}` },
    } as Question);
  const createResponsibleUser = (id: number, tn = 0): ResponsibleUser =>
    ({
      id,
      tn,
    } as ResponsibleUser);

  describe('search', () => {
    it('should change attributes', () => {
      action = SearchActions.search({ term: 'asd' });
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(true);
      expect(result.error).toBeNull();
      expect(result.categoryIds).toEqual([]);
      expect(result.serviceIds).toEqual([]);
      expect(result.questionIds).toEqual([]);
    });
  });

  describe('searchSuccess', () => {
    it('should change attributes', () => {
      initialState.loading = true;
      action = SearchActions.searchSuccess({
        categoryIds: [1, 2],
        serviceIds: [3, 4],
        questionIds: [5, 6],
      });
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.loading).toBe(false);
      expect(result.error).toBeUndefined();
      expect(result.categoryIds).toEqual([1, 2]);
      expect(result.serviceIds).toEqual([3, 4]);
      expect(result.questionIds).toEqual([5, 6]);
    });
  });

  describe('searchFailure', () => {
    it('should change attributes', () => {
      const error = 'fake-error';
      initialState.loading = true;
      action = SearchActions.searchFailure({ error });
      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.loading).toBe(false);
      expect(result.error).toBe(error);
    });
  });

  describe('setAll', () => {
    it('should change attributes', () => {
      const categories = [createCategory(111), createCategory(222)];
      const services = [createService(333), createService(444)];
      const questions = [createQuestion(555), createQuestion(666)];
      const responsibleUsers = [createResponsibleUser(777), createResponsibleUser(888)];
      action = SearchActions.setAll({ categories, services, questions, responsibleUsers });
      const result = reducer(initialState, action);

      expect(result.category.ids).toEqual([111, 222]);
      expect(result.service.ids).toEqual([333, 444]);
      expect(result.question.ids).toEqual([555, 666]);
      expect(result.responsibleUser.ids).toEqual([777, 888]);
    });
  });

  describe('removeAll', () => {
    it('should change attributes', () => {
      const categories = [createCategory(111), createCategory(222)];
      const services = [createService(333), createService(444)];
      const questions = [createQuestion(555), createQuestion(666)];
      const responsibleUsers = [createResponsibleUser(777), createResponsibleUser(888)];
      action = SearchActions.setAll({ categories, services, questions, responsibleUsers });
      const state = reducer(initialState, action);
      action = SearchActions.removeAll();
      const result = reducer(state, action);

      expect(result.category.ids.length).toBe(0);
      expect(result.service.ids.length).toBe(0);
      expect(result.question.ids.length).toBe(0);
      expect(result.responsibleUser.ids.length).toBe(0);
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
