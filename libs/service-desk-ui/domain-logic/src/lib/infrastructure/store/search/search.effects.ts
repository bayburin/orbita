import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatMap, switchMap, catchError } from 'rxjs/operators';
import { of, concat } from 'rxjs';

import { HomeApi } from '../../api/home/home.api';
import { QuestionCacheService } from '../../services/question-cache.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import * as SearchActions from './search.actions';
import * as SearchFeature from './search.reducer';

@Injectable()
export class SearchEffects {
  constructor(
    private readonly actions$: Actions,
    private homeApi: HomeApi,
    private errorHandlerService: ErrorHandlerService
  ) {}

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
                services: [...data.services, ...Object.values(normalizeData.entities.services || [])],
                questions: Object.values(normalizeData.entities.questions || []),
                responsibleUsers: Object.values(normalizeData.entities.responsible_users || []),
              };
              const categoryIds = data.categories.map((category) => category.id);
              const serviceIds = data.services.map((service) => service.id);
              const questionIds = data.questions.map((question) => question.id);

              return [
                SearchActions.setAll({
                  categories: result.categories,
                  services: result.services,
                  questions: result.questions,
                  responsibleUsers: result.responsibleUsers,
                }),
                SearchActions.searchSuccess({ categoryIds, serviceIds, questionIds }),
              ];
            }),
            catchError((error) => {
              this.errorHandlerService.handleError(error);

              return of(SearchActions.searchFailure({ error }));
            })
          )
        )
      )
    )
  );
}
