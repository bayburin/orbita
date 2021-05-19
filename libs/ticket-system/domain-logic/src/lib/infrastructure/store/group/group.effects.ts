// import { Injectable } from '@angular/core';
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { fetch } from '@nrwl/angular';

// import * as GroupFeature from './group.reducer';
// import * as GroupActions from './group.actions';

// @Injectable()
// export class GroupEffects {
//   init$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(GroupActions.init),
//       fetch({
//         run: (action) => {
//           // Your custom service 'load' logic goes here. For now just return a success action...
//           return GroupActions.loadGroupSuccess({ group: [] });
//         },

//         onError: (action, error) => {
//           console.error('Error', error);
//           return GroupActions.loadGroupFailure({ error });
//         },
//       })
//     )
//   );

//   constructor(private actions$: Actions) {}
// }
