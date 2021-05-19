// import { GroupEntity } from './group.models';
// import * as GroupActions from './group.actions';
// import { State, initialState, reducer } from './group.reducer';

// describe('Group Reducer', () => {
//   const createGroupEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as GroupEntity);

//   beforeEach(() => {});

//   describe('valid Group actions', () => {
//     it('loadGroupSuccess should return set the list of known Group', () => {
//       const group = [
//         createGroupEntity('PRODUCT-AAA'),
//         createGroupEntity('PRODUCT-zzz'),
//       ];
//       const action = GroupActions.loadGroupSuccess({ group });

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
