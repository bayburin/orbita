import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AdminCategoryFacadeAbstract } from './admin-category.facade.abstract';
import { Category } from '../../../entities/models/category.interface';
import * as CategoryFeature from '../../../infrastructure/store/category/category.reducer';
import * as CategorySelectors from '../../../infrastructure/store/category/category.selectors';
import * as CategoryActions from '../../../infrastructure/store/category/category.actions';
import * as VMSelectors from '../../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с админкой категорий
 */
@Injectable({
  providedIn: 'root',
})
export class AdminCategoryFacade implements AdminCategoryFacadeAbstract {
  all$ = this.store.select(CategorySelectors.getAll);
  selected$ = this.store.select(VMSelectors.getSelectedCategoryVM);
  loading$ = this.store.select(CategorySelectors.getLoading);
  loaded$ = this.store.select(CategorySelectors.getLoaded);

  // ========== Форма рекомендаций для пользователя ==========

  formData$ = this.store.select(CategorySelectors.getFormData);
  formLoading$ = this.store.select(CategorySelectors.getFormLoading);
  formDisplay$ = this.store.select(CategorySelectors.getFormDisplayForm);
  formError$ = this.store.select(CategorySelectors.getFormError);

  constructor(private store: Store<CategoryFeature.CategoryPartialState>) {}

  loadAll() {
    this.store.dispatch(CategoryActions.adminLoadAll());
  }

  edit(id: number) {
    this.store.dispatch(CategoryActions.adminSelect({ id, edit: true }));
  }

  initForm() {
    this.store.dispatch(CategoryActions.adminInitForm({}));
  }

  closeForm() {
    this.store.dispatch(CategoryActions.adminCloseForm());
  }

  changeForm(formData: Category) {
    this.store.dispatch(CategoryActions.adminChangeForm({ formData }));
  }

  saveForm() {
    this.store.dispatch(CategoryActions.adminSaveForm());
  }
}
