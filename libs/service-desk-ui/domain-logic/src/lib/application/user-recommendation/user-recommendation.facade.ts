import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserRecommendationFacadeAbstract } from './user-recommendation.facade.abstract';
import * as UserRecommendationFeature from '../../infrastructure/store/user-recommendation/user-recommendation.reducer';
import * as UserRecommendationSelectors from '../../infrastructure/store/user-recommendation/user-recommendation.selectors';
import * as UserRecommendationActions from '../../infrastructure/store/user-recommendation/user-recommendation.actions';

/**
 * Фасад для работы с рекомендациями
 */
@Injectable({
  providedIn: 'root',
})
export class UserRecommendationFacade implements UserRecommendationFacadeAbstract {
  all$ = this.store.select(UserRecommendationSelectors.getAll);
  loading$ = this.store.select(UserRecommendationSelectors.getLoading);
  loaded$ = this.store.select(UserRecommendationSelectors.getLoaded);

  constructor(private store: Store<UserRecommendationFeature.UserRecommendationPartialState>) {}

  // loadAll() {
  //   this.store.dispatch(UserRecommendationActions.loadAll());
  // }
}
