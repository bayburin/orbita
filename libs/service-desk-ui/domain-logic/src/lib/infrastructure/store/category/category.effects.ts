import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { map } from 'rxjs/operators';

import { CategoryApi } from './../../api/category/category.api';
import * as CategoryActions from './category.actions';
import * as CategoryFeature from './category.reducer';

@Injectable()
export class CategoryEffects {
  constructor(private readonly actions$: Actions, private categoryApi: CategoryApi) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadAll),
      fetch({
        run: (_action) => {
          return this.categoryApi.query().pipe(map((categories) => CategoryActions.loadAllSuccess({ categories })));
        },
        onError: (_action, error) => {
          console.error('Error', error);
          return CategoryActions.loadAllFailure({ error });
        },
      })
    )
  );
}