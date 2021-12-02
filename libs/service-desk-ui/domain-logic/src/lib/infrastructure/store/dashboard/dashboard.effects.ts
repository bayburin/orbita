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
              console.log(dashboard);

              return [
                CategoryActions.setAll({ categories: dashboard.categories || [] }),
                UserRecommendationActions.setAll({ recommendations: dashboard.user_recommendations || [] }),
                ServiceActions.setAll({ services: dashboard.services || [] }),
                DashboardActions.loadDashboardSuccess(),
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
