// import { AppEntity } from './app.models';
// import { appAdapter, AppPartialState, initialState } from './app.reducer';
// import * as AppSelectors from './app.selectors';

// describe('App Selectors', () => {
//   const ERROR_MSG = 'No Error Available';
//   const getAppId = (it: AppEntity) => it.id;
//   const createAppEntity = (id: string, name = '') =>
//     ({
//       id,
//       name: name || `name-${id}`,
//     } as AppEntity);

//   let state: AppPartialState;

//   beforeEach(() => {
//     state = {
//       app: appAdapter.setAll(
//         [createAppEntity('PRODUCT-AAA'), createAppEntity('PRODUCT-BBB'), createAppEntity('PRODUCT-CCC')],
//         {
//           ...initialState,
//           selectedId: 'PRODUCT-BBB',
//           error: ERROR_MSG,
//           loaded: true,
//         }
//       ),
//     };
//   });

//   describe('App Selectors', () => {
//     it('getAllApp() should return the list of App', () => {
//       const results = AppSelectors.getAllApp(state);
//       const selId = getAppId(results[1]);

//       expect(results.length).toBe(3);
//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getSelected() should return the selected Entity', () => {
//       const result = AppSelectors.getSelected(state) as AppEntity;
//       const selId = getAppId(result);

//       expect(selId).toBe('PRODUCT-BBB');
//     });

//     it('getAppLoaded() should return the current "loaded" status', () => {
//       const result = AppSelectors.getAppLoaded(state);

//       expect(result).toBe(true);
//     });

//     it('getAppError() should return the current "error" state', () => {
//       const result = AppSelectors.getAppError(state);

//       expect(result).toBe(ERROR_MSG);
//     });
//   });
// });
