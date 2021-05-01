import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as FreeSdRequestTypeActions from './free-sd-request-type.actions';
import { ServiceDeskApi } from '../../api/service-desk/service-desk.api';

@Injectable()
export class FreeSdRequestTypeEffects {
  constructor(
    private actions$: Actions,
    private serviceDeskApi: ServiceDeskApi
  ) { }

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FreeSdRequestTypeActions.loadAll),
      fetch({
        run: () => {
          return this.serviceDeskApi.getFreeSdRequestTypes().pipe(
            map(freeSdRequestTypes => FreeSdRequestTypeActions.loadAllSuccess({ freeSdRequestTypes }))
          )
        },

        onError: (action, error) => {
          return FreeSdRequestTypeActions.loadAllFailure({ error });
        },
      })
    )
  );
}
