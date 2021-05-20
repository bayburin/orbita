// import { MessageEntity } from './message.models';
// import * as MessageActions from './message.actions';
// import { State, initialState, reducer } from './message.reducer';

// describe('Message Reducer', () => {
//   const createMessageEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as MessageEntity);

//   beforeEach(() => {});

//   describe('valid Message actions', () => {
//     it('loadMessageSuccess should return set the list of known Message', () => {
//       const message = [
//         createMessageEntity('PRODUCT-AAA'),
//         createMessageEntity('PRODUCT-zzz'),
//       ];
//       const action = MessageActions.loadMessageSuccess({ message });

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
