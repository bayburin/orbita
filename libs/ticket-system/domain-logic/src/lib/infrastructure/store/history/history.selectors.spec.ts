// import { HistoryEntity } from './history.models';
// import { State, historyAdapter, initialState } from './history.reducer';
// import * as HistorySelectors from './history.selectors';

// describe('History Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getHistoryId = (it) => it['id'];
//   const createHistoryEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as HistoryEntity);

//   let state;

//   beforeEach(() => {
//     state = {
//       history: historyAdapter.setAll(
//         [
//           createHistoryEntity('PRODUCT-AAA'),
//           createHistoryEntity('PRODUCT-BBB'),
//           createHistoryEntity('PRODUCT-CCC'),
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

//   describe('History Selectors', () => {
//     it('getAllHistory() should return the list of History', () => {
//       const results = HistorySelectors.getAllHistory(state);
//       const selId = getHistoryId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = HistorySelectors.getSelected(state);
//       const selId = getHistoryId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getHistoryLoaded() should return the current 'loaded' status", () => {
//       const result = HistorySelectors.getHistoryLoaded(state);

//       expect(result).toBe(true);
//     });

//     it("getHistoryError() should return the current 'error' state", () => {
//       const result = HistorySelectors.getHistoryError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });

it('', () => {});
