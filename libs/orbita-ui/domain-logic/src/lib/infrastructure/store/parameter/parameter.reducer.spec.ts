// import { Action } from '@ngrx/store';

// import { Parameter } from '../../../entities/models/parameter.interface';
// import * as ParameterActions from './parameter.actions';
// import { State, initialState, reducer } from './parameter.reducer';

// describe('ParameterReducer', () => {
//   let action: Action;
//   const createParameterEntity = (id: number, name = '') =>
//     (({
//       id,
//       name: name || `name-${id}`,
//     } as unknown) as Parameter);

//   describe('loadAll()', () => {
//     it('should set attributes', () => {
//       action = ParameterActions.loadAll();
//       const result: State = reducer(initialState, action);

//       expect(result.loading).toBe(true);
//       expect(result.loaded).toBe(false);
//       expect(result.error).toBe(null);
//     });
//   });

//   describe('loadAllSuccess()', () => {
//     it('should set attributes', () => {
//       const parameters = [createParameterEntity(1), createParameterEntity(2)];
//       action = ParameterActions.loadAllSuccess({ parameters });
//       const result: State = reducer(initialState, action);

//       expect(result.loading).toBe(false);
//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toEqual(2);
//     });
//   });

//   describe('loadAllFailure()', () => {
//     it('should set attributes', () => {
//       const error = { message: 'test message' };
//       action = ParameterActions.loadAllFailure({ error });
//       const result: State = reducer(initialState, action);

//       expect(result.loading).toBe(false);
//       expect(result.loaded).toBe(false);
//       expect(result.error).toEqual(error);
//     });
//   });

//   describe('clearAll()', () => {
//     it('should set attributes', () => {
//       const parameters = [createParameterEntity(1), createParameterEntity(2)];
//       action = ParameterActions.loadAllSuccess({ parameters });
//       const state = reducer(initialState, action);
//       action = ParameterActions.clearAll();
//       const result: State = reducer(state, action);

//       expect(result.loading).toBe(false);
//       expect(result.loaded).toBe(false);
//       expect(result.ids.length).toBe(0);
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       action = {} as any;
//       const result = reducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });

it('', () => {
  /** */
});
