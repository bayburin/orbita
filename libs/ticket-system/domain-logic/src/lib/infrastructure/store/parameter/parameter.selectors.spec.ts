// import { ParameterEntity } from './parameter.models';
// import { State, parameterAdapter, initialState } from './parameter.reducer';
// import * as ParameterSelectors from './parameter.selectors';

// describe('Parameter Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getParameterId = (it) => it['id'];
//   const createParameterEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as ParameterEntity);

//   let state;

//   beforeEach(() => {
//     state = {
//       parameter: parameterAdapter.setAll(
//         [
//           createParameterEntity('PRODUCT-AAA'),
//           createParameterEntity('PRODUCT-BBB'),
//           createParameterEntity('PRODUCT-CCC'),
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

//   describe('Parameter Selectors', () => {
//     it('getAllParameter() should return the list of Parameter', () => {
//       const results = ParameterSelectors.getAllParameter(state);
//       const selId = getParameterId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = ParameterSelectors.getSelected(state);
//       const selId = getParameterId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it("getParameterLoaded() should return the current 'loaded' status", () => {
//       const result = ParameterSelectors.getParameterLoaded(state);

//       expect(result).toBe(true);
//     });

//     it("getParameterError() should return the current 'error' state", () => {
//       const result = ParameterSelectors.getParameterError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });

it('', () => {});
