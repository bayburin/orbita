import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { switchMap, withLatestFrom, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { CategoryApi } from './../../api/category/category.api';
import { CategoryCacheService } from './../../services/category-cache.service';
import * as CategoryActions from './category.actions';
import * as CategoryFeature from './category.reducer';
import * as ServiceActions from '../service/service.actions';
import * as QuestionActions from '../question/question.actions';
import * as RouterSelectors from '../selectors/router.selectors';

@Injectable()
export class CategoryEffects {
  constructor(
    private readonly actions$: Actions,
    private store: Store<CategoryFeature.CategoryPartialState>,
    private categoryApi: CategoryApi
  ) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadAll),
      fetch({
        run: (_action) => {
          return this.categoryApi.query().pipe(
            switchMap((categories) => {
              const data = CategoryCacheService.normalizeategories(categories);

              return [
                ServiceActions.setEntities({ entities: data.entities.services }),
                CategoryActions.loadAllSuccess({ entities: data.entities.categories, ids: data.result as number[] }),
              ];
            })
          );
        },
        onError: (_action, error) => {
          console.error('Error', error);
          return CategoryActions.loadAllFailure({ error });
        },
      })
    )
  );

  loadSelected$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadSelected),
      withLatestFrom(this.store.select(RouterSelectors.selectRouteParams)),
      switchMap(([_action, params]) =>
        this.categoryApi.show(params.id).pipe(
          switchMap((category) => {
            const data = CategoryCacheService.normalizeategories(category);

            return [
              QuestionActions.setEntities({ entities: data.entities.questions }),
              ServiceActions.setEntities({ entities: data.entities.services }),
              CategoryActions.loadSelectedSuccess({ category: data.entities.categories[params.id] }),
            ];
          }),
          catchError((error) => of(CategoryActions.loadSelectedFailure({ error })))
        )
      )
    )
  );
}
