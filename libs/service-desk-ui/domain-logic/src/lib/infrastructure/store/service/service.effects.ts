import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, withLatestFrom, catchError } from 'rxjs/operators';

import { ServiceApi } from '../../api/service/service.api';
import * as ServiceActions from './service.actions';
import * as ServiceFeature from './service.reducer';
import * as RouterSelectors from '../selectors/router.selectors';
import * as CategoryActions from '../category/category.actions';
import * as QuestionActions from '../question/question.actions';
import * as AnswerActions from '../answer/answer.actions';
import * as ResponsibleUserActions from '../responsible-user/responsible-user.actions';
import { ServiceCacheService } from '../../services/service-cache.service';

@Injectable()
export class ServiceEffects {
  constructor(
    private readonly actions$: Actions,
    private serviceApi: ServiceApi,
    private store: Store<ServiceFeature.ServicePartialState>
  ) {}

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, params]) =>
        this.serviceApi.show(params.id).pipe(
          switchMap((service) => {
            const data = ServiceCacheService.normalizeServices(service).entities;

            return [
              AnswerActions.setEntities({ entities: data.answers }),
              QuestionActions.setEntities({ entities: data.questions }),
              ResponsibleUserActions.setEntities({ entities: data.responsible_users }),
              CategoryActions.setEntities({ entities: data.categories }),
              CategoryActions.setSelectedId({ selectedId: service.category_id }),
              ServiceActions.loadSelectedSuccess({ service: data.services[params.id] }),
            ];
          }),
          catchError((error) => of(ServiceActions.loadSelectedFailure({ error })))
        )
      )
    )
  );
}
