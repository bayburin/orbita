import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { switchMap } from 'rxjs/operators';

import { DashboardApi } from './../../api/dashboard/dashboard.api';
import * as DashboardActions from './dashboard.actions';
import * as DashboardFeature from './dashboard.reducer';
import * as CategoryActions from './../category/category.actions';
import * as UserRecommendationActions from './../user-recommendation/user-recommendation.actions';
import * as ServiceActions from './../service/service.actions';
import * as QuestionActions from './../question/question.actions';
import { ServiceCacheService } from '../../services/service-cache.service';

@Injectable()
export class DashboardEffects {
  constructor(private readonly actions$: Actions, private dashboardApi: DashboardApi) {}

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      fetch({
        run: (_action) => {
          return this.dashboardApi.loadDashboardData().pipe(
            switchMap((dashboard) => {
              const normalizedServices = ServiceCacheService.normalizeServices(dashboard.services).entities;
              const categoryIds = dashboard.categories.map((category) => category.id);
              const serviceIds = dashboard.services.map((service) => service.id);

              return [
                CategoryActions.setAll({ categories: dashboard.categories || [] }),
                UserRecommendationActions.setAll({ recommendations: dashboard.user_recommendations || [] }),
                QuestionActions.setEntities({ entities: normalizedServices.questions }),
                ServiceActions.setEntities({ entities: normalizedServices.services }),
                DashboardActions.loadDashboardSuccess({ categoryIds, serviceIds }),
              ];
            })
          );
        },
        onError: (action, error) => {
          console.error('Error', error);
          return DashboardActions.loadDashboardFailure({ error });
        },
      })
    )
  );
}
