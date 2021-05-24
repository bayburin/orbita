// import { WorkEntity } from './work.models';
// import { State, workAdapter, initialState } from './work.reducer';
// import * as WorkSelectors from './work.selectors';

// describe('Work Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getWorkId = (it) => it['id'];
//   const createWorkEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as WorkEntity);

//   let state;

//   beforeEach(() => {
//     state = {
//       work: workAdapter.setAll(
//         [
//           createWorkEntity('PRODUCT-AAA'),
//           createWorkEntity('PRODUCT-BBB'),
//           createWorkEntity('PRODUCT-CCC'),
//         ],
//         {
//           ...initialState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true,
//         }
//       ),
//     };
//   });

//   describe('Work Selectors', () => {
//     it('getAllWork() should return the list of Work', () => {
//       const results = WorkSelectors.getAllWork(state);
//       const selId = getWorkId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = WorkSelectors.getSelected(state);
//       const selId = getWorkId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getWorkLoaded() should return the current 'loaded' status", () => {
//       const result = WorkSelectors.getWorkLoaded(state);

//       expect(result).toBe(true);
//     });

//     it("getWorkError() should return the current 'error' state", () => {
//       const result = WorkSelectors.getWorkError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });

it('', () => {});
