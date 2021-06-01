// import { Injectable } from '@angular/core';
// import { createEffect, Actions, ofType } from '@ngrx/effects';
// import { fetch } from '@nrwl/angular';

// import * as MessageFeature from './message.reducer';
// import * as MessageActions from './message.actions';

// @Injectable()
// export class MessageEffects {
//   init$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(MessageActions.init),
//       fetch({
//         run: (action) => {
//           // Your custom service 'load' logic goes here. For now just return a success action...
//           return MessageActions.loadMessageSuccess({ message: [] });
//         },

//         onError: (action, error) => {
//           console.error('Error', error);
//           return MessageActions.loadMessageFailure({ error });
//         },
//       })
//     )
//   );

//   constructor(private actions$: Actions) {}
// }
