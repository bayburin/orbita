import { Action } from '@ngrx/store';

import { SdService } from './../../../entities/models/sd/sd-service.interface';
import * as SdServiceActions from './sd-service.actions';
import { State, initialState, reducer } from './sd-service.reducer';

describe('SdServiceReducer', () => {
  let action: Action;
  const createSdServiceEntity = (id: number, name = '') =>
    (({
      id,
      name: name || `name-${id}`,
    } as unknown) as SdService);

  describe('SetAll()', () => {
    it('should change "loaded" and "entities" attributes', () => {
      const services = [createSdServiceEntity(1), createSdServiceEntity(2)];
      action = SdServiceActions.setAll({ services });
      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toEqual(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
