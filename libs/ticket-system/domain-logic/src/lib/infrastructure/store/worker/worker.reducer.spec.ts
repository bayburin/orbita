// import { UserWorkEntity } from './user-work.models';
// import * as UserWorkActions from './user-work.actions';
// import { State, initialState, reducer } from './user-work.reducer';

// describe('UserWork Reducer', () => {
//   const createUserWorkEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as UserWorkEntity);

//   beforeEach(() => {});

//   describe('valid UserWork actions', () => {
//     it('loadUserWorkSuccess should return set the list of known UserWork', () => {
//       const userWork = [
//         createUserWorkEntity('PRODUCT-AAA'),
//         createUserWorkEntity('PRODUCT-zzz'),
//       ];
//       const action = UserWorkActions.loadUserWorkSuccess({ userWork });

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
