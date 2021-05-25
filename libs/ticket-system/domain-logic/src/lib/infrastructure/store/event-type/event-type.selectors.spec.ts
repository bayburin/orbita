// import { EventTypeEntity } from './event-type.models';
// import { State, eventTypeAdapter, initialState } from './event-type.reducer';
// import * as EventTypeSelectors from './event-type.selectors';

// describe('EventType Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getEventTypeId = (it) => it['id'];
//   const createEventTypeEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as EventTypeEntity);

//   let state;

//   beforeEach(() => {
//     state = {
//       eventType: eventTypeAdapter.setAll(
//         [
//           createEventTypeEntity('PRODUCT-AAA'),
//           createEventTypeEntity('PRODUCT-BBB'),
//           createEventTypeEntity('PRODUCT-CCC'),
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

//   describe('EventType Selectors', () => {
//     it('getAllEventType() should return the list of EventType', () => {
//       const results = EventTypeSelectors.getAllEventType(state);
//       const selId = getEventTypeId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = EventTypeSelectors.getSelected(state);
//       const selId = getEventTypeId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getEventTypeLoaded() should return the current 'loaded' status", () => {
//       const result = EventTypeSelectors.getEventTypeLoaded(state);

//       expect(result).toBe(true);
//     });

//     it("getEventTypeError() should return the current 'error' state", () => {
//       const result = EventTypeSelectors.getEventTypeError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });

it('', () => {});
