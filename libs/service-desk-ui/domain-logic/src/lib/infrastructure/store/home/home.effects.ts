import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { switchMap } from 'rxjs/operators';

import { HomeApi } from '../../api/home/home.api';
import * as HomeActions from './home.actions';
import * as HomeFeature from './home.reducer';
import * as CategoryActions from '../category/category.actions';
import * as UserRecommendationActions from '../user-recommendation/user-recommendation.actions';
import * as ServiceActions from '../service/service.actions';
import * as QuestionActions from '../question/question.actions';
import { ServiceCacheService } from '../../services/service-cache.service';

@Injectable()
export class HomeEffects {
  constructor(private readonly actions$: Actions, private homeApi: HomeApi) {}

  loadHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(HomeActions.loadHome),
      fetch({
        run: (_action) => {
          return this.homeApi.loadHomeData().pipe(
            switchMap((home) => {
              const normalizedServices = ServiceCacheService.normalizeServices(home.services).entities;
              const categoryIds = home.categories.map((category) => category.id);
              const serviceIds = home.services.map((service) => service.id);

              return [
                CategoryActions.setAll({ categories: home.categories || [] }),
                UserRecommendationActions.setAll({ recommendations: home.user_recommendations || [] }),
                QuestionActions.setEntities({ entities: normalizedServices.questions }),
                ServiceActions.setEntities({ entities: normalizedServices.services }),
                HomeActions.loadHomeSuccess({ categoryIds, serviceIds }),
              ];
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return HomeActions.loadHomeFailure({ error });
        },
      })
    )
  );
}
