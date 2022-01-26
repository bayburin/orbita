import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { switchMap } from 'rxjs/operators';

import { AdminHomeApi } from '../../api/admin/admin-home/admin-home.api';
import { ServiceCacheService } from '../../services/service-cache.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as AdminHomeActions from './admin-home.actions';
import * as CategoryActions from '../category/category.actions';
import * as UserRecommendationActions from '../user-recommendation/user-recommendation.actions';
import * as ServiceActions from '../service/service.actions';
import * as ResponsibleUserActions from '../responsible-user/responsible-user.actions';

@Injectable()
export class AdminHomeEffects {
  constructor(
    private readonly actions$: Actions,
    private adminHomeApi: AdminHomeApi,
    private errorHandlerService: ErrorHandlerService
  ) {}

  loadHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminHomeActions.loadHome),
      fetch({
        run: (_action) => {
          return this.adminHomeApi.loadHomeData().pipe(
            switchMap((home) => {
              const normalizedServices = ServiceCacheService.normalizeServices(home.services).entities;

              return [
                UserRecommendationActions.setAll({ recommendations: home.user_recommendations || [] }),
                CategoryActions.setAll({ categories: home.categories || [] }),
                ResponsibleUserActions.setEntities({ entities: normalizedServices.responsible_users }),
                ServiceActions.setEntities({ entities: normalizedServices.services }),
                AdminHomeActions.loadHomeSuccess(),
              ];
            })
          );
        },
        onError: (_action, error) => {
          this.errorHandlerService.handleError(error);

          return AdminHomeActions.loadHomeFailure({ error });
        },
      })
    )
  );
}
