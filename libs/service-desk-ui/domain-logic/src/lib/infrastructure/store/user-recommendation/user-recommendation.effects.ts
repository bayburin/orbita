import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { UserRecommendationApi } from './../../api/user-recommendation/user-recommendation.api';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as UserRecommendationActions from './user-recommendation.actions';
import * as UserRecommendationFeature from './user-recommendation.reducer';

@Injectable()
export class UserRecommendationEffects {
  constructor(
    private readonly actions$: Actions,
    private userRecommendationApi: UserRecommendationApi,
    private errorHandlerService: ErrorHandlerService
  ) {}

  // loadAll$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserRecommendationActions.loadAll),
  //     fetch({
  //       run: () => {
  //         return this.userRecommendationApi
  //           .query()
  //           .pipe(map((recommendations) => UserRecommendationActions.loadAllSuccess({ recommendations })));
  //       },
  //       onError: (action, error) => {
  //         this.errorHandlerService.handleError(error);

  //         return UserRecommendationActions.loadAllFailure({ error });
  //       },
  //     })
  //   )
  // );
}
