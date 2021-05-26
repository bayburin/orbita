// import { UserWorkEntity } from './user-work.models';
// import { State, userWorkAdapter, initialState } from './user-work.reducer';
// import * as UserWorkSelectors from './user-work.selectors';

// describe('UserWork Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getUserWorkId = (it) => it['id'];
//   const createUserWorkEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as UserWorkEntity);

//   let state;

//   beforeEach(() => {
//     state = {
//       userWork: userWorkAdapter.setAll(
//         [
//           createUserWorkEntity('PRODUCT-AAA'),
//           createUserWorkEntity('PRODUCT-BBB'),
//           createUserWorkEntity('PRODUCT-CCC'),
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

//   describe('UserWork Selectors', () => {
//     it('getAllUserWork() should return the list of UserWork', () => {
//       const results = UserWorkSelectors.getAllUserWork(state);
//       const selId = getUserWorkId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = UserWorkSelectors.getSelected(state);
//       const selId = getUserWorkId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getUserWorkLoaded() should return the current 'loaded' status", () => {
//       const result = UserWorkSelectors.getUserWorkLoaded(state);

//       expect(result).toBe(true);
//     });

//     it("getUserWorkError() should return the current 'error' state", () => {
//       const result = UserWorkSelectors.getUserWorkError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });

it('', () => {});
