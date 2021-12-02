import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { switchMap } from 'rxjs/operators';

import { CategoryApi } from './../../api/category/category.api';
import * as CategoryActions from './category.actions';
import * as CategoryFeature from './category.reducer';
import * as ServiceActions from '../service/service.actions';
import { CategoryCacheService } from './../../services/category-cache.service';

@Injectable()
export class CategoryEffects {
  constructor(private readonly actions$: Actions, private categoryApi: CategoryApi) {}

  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadAll),
      fetch({
        run: (_action) => {
          return this.categoryApi.query().pipe(
            switchMap((categories) => {
              const data = CategoryCacheService.normalizeategories(categories);

              return [
                ServiceActions.setAll({ services: Object.values(data.entities.services || []) }),
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
}
