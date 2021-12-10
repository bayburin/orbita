import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, switchMap } from 'rxjs/operators';
import { of, concat } from 'rxjs';

import * as SearchActions from './search.actions';
import * as SearchFeature from './search.reducer';
import { HomeApi } from '../../api/home/home.api';
import { QuestionCacheService } from '../../services/question-cache.service';

@Injectable()
export class SearchEffects {
  constructor(private readonly actions$: Actions, private homeApi: HomeApi) {}

  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.search),
      concatMap((action) =>
        concat(
          of(SearchActions.removeAll()),
          this.homeApi.search(action.term).pipe(
            switchMap((data) => {
              const normalizeData = QuestionCacheService.normalizeQuestions(data.questions);
              const result = {
                categories: data.categories,
                services: [...data.services, ...Object.values(normalizeData.entities.services)],
                questions: Object.values(normalizeData.entities.questions),
              };
              const categoryIds = data.categories.map((category) => category.id);
              const serviceIds = data.services.map((service) => service.id);
              const questionIds = data.questions.map((question) => question.id);

              return [
                SearchActions.setAll({ result }),
                SearchActions.searchSuccess({ categoryIds, serviceIds, questionIds }),
              ];
            })
          )
        )
      )
    )
  );
}
