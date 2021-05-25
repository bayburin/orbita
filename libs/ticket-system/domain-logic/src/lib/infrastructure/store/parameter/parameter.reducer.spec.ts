// import { ParameterEntity } from './parameter.models';
// import * as ParameterActions from './parameter.actions';
// import { State, initialState, reducer } from './parameter.reducer';

// describe('Parameter Reducer', () => {
//   const createParameterEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as ParameterEntity);

//   beforeEach(() => {});

//   describe('valid Parameter actions', () => {
//     it('loadParameterSuccess should return set the list of known Parameter', () => {
//       const parameter = [
//         createParameterEntity('PRODUCT-AAA'),
//         createParameterEntity('PRODUCT-zzz'),
//       ];
//       const action = ParameterActions.loadParameterSuccess({ parameter });

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
