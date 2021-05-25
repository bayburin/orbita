// import { EventTypeEntity } from './event-type.models';
// import * as EventTypeActions from './event-type.actions';
// import { State, initialState, reducer } from './event-type.reducer';

// describe('EventType Reducer', () => {
//   const createEventTypeEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as EventTypeEntity);

//   beforeEach(() => {});

//   describe('valid EventType actions', () => {
//     it('loadEventTypeSuccess should return set the list of known EventType', () => {
//       const eventType = [
//         createEventTypeEntity('PRODUCT-AAA'),
//         createEventTypeEntity('PRODUCT-zzz'),
//       ];
//       const action = EventTypeActions.loadEventTypeSuccess({ eventType });

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
