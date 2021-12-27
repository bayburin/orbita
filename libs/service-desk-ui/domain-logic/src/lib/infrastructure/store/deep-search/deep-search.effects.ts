import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { filter, switchMap, withLatestFrom, map } from 'rxjs/operators';

import * as DeepSearchActions from './deep-search.actions';
import * as DeepSearchFeature from './deep-search.reducer';
import * as CategoryActions from '../category/category.actions';
import * as ServiceActions from '../service/service.actions';
import * as QuestionActions from '../question/question.actions';
import * as ResponsibleUserActions from '../responsible-user/responsible-user.actions';
import * as RouterSelectors from '../selectors/router.selectors';
import { HomeApi } from '../../api/home/home.api';
import { QuestionCacheService } from '../../services/question-cache.service';

@Injectable()
export class DeepSearchEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<DeepSearchFeature.DeepSearchPartialState>,
    private homeApi: HomeApi
  ) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeepSearchActions.search),
      withLatestFrom(this.store.select(RouterSelectors.selectQueryParams)),
      filter(([_action, params]) => !!params.search),
      map(([_action, params]) => DeepSearchActions.searchStart({ term: params.search }))
    )
  );

  searchStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeepSearchActions.searchStart),
      switchMap((action) => {
        return this.homeApi.deepSearch(action.term).pipe(
          switchMap((data) => {
            const normalizeData = QuestionCacheService.normalizeQuestions(data.questions);
            const services = [...data.services, ...Object.values(normalizeData.entities.services || [])];
            const categoryIds = data.categories.map((category) => category.id);
            const serviceIds = data.services.map((service) => service.id);
            const questionIds = data.questions.map((question) => question.id);

            return [
              CategoryActions.setAll({ categories: data.categories || [] }),
              ServiceActions.setAll({ services }),
              ResponsibleUserActions.setEntities({ entities: normalizeData.entities.responsible_users || {} }),
              QuestionActions.setEntities({ entities: normalizeData.entities.questions || {} }),
              DeepSearchActions.searchSuccess({ categoryIds, serviceIds, questionIds }),
            ];
          })
        );
      })
    )
  );
}
