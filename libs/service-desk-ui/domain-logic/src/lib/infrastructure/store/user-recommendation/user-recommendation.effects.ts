import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as UserRecommendationActions from './user-recommendation.actions';
import * as UserRecommendationFeature from './user-recommendation.reducer';

@Injectable()
export class UserRecommendationEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserRecommendationActions.init),
      fetch({
        run: (action) => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return UserRecommendationActions.loadUserRecommendationSuccess({ userRecommendation: [] });
        },
        onError: (action, error) => {
          console.error('Error', error);
          return UserRecommendationActions.loadUserRecommendationFailure({ error });
        },
      })
    )
  );

  constructor(private readonly actions$: Actions) {}
}
