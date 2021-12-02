import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { CategoryFacadeAbstract } from './category.facade.abstract';
import * as CategoryFeature from '../../infrastructure/store/category/category.reducer';
import * as CategorySelectors from '../../infrastructure/store/category/category.selectors';
import * as CategoryActions from '../../infrastructure/store/category/category.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с категориями
 */
@Injectable({
  providedIn: 'root',
})
export class CategoryFacade implements CategoryFacadeAbstract {
  all$ = this.store.select(VMSelectors.getAllCategoriesVM);
  loading$ = this.store.select(CategorySelectors.getLoading);
  loaded$ = this.store.select(CategorySelectors.getLoaded);

  constructor(private store: Store<CategoryFeature.CategoryPartialState>) {}

  loadAll() {
    this.store.dispatch(CategoryActions.loadAll());
  }
}
