// import { WorkEntity } from './work.models';
// import * as WorkActions from './work.actions';
// import { State, initialState, reducer } from './work.reducer';

// describe('Work Reducer', () => {
//   const createWorkEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as WorkEntity);

//   beforeEach(() => {});

//   describe('valid Work actions', () => {
//     it('loadWorkSuccess should return set the list of known Work', () => {
//       const work = [
//         createWorkEntity('PRODUCT-AAA'),
//         createWorkEntity('PRODUCT-zzz'),
//       ];
//       const action = WorkActions.loadWorkSuccess({ work });

//       const result: State = reducer(initialState, action);

//       expect(result.loaded).toBe(true);
//       expect(result.ids.length).toBe(2);
//     });
//   });

//   describe('unknown action', () => {
//     it('should return the previous state', () => {
//       const action = {} as any;

//       const result = reducer(initialState, action);

//       expect(result).toBe(initialState);
//     });
//   });
// });

it('', () => {});
