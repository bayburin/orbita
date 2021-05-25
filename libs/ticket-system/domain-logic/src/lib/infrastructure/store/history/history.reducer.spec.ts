// import { HistoryEntity } from './history.models';
// import * as HistoryActions from './history.actions';
// import { State, initialState, reducer } from './history.reducer';

// describe('History Reducer', () => {
//   const createHistoryEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as HistoryEntity);

//   beforeEach(() => {});

//   describe('valid History actions', () => {
//     it('loadHistorySuccess should return set the list of known History', () => {
//       const history = [
//         createHistoryEntity('PRODUCT-AAA'),
//         createHistoryEntity('PRODUCT-zzz'),
//       ];
//       const action = HistoryActions.loadHistorySuccess({ history });

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
