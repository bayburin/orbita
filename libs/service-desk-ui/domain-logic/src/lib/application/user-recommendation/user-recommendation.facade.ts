import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserRecommendationFacadeAbstract } from './user-recommendation.facade.abstract';
import { UserRecommendationViewForm } from '../../entities/form/user-recommendation-view-form.interface';
import * as UserRecommendationFeature from '../../infrastructure/store/user-recommendation/user-recommendation.reducer';
import * as UserRecommendationSelectors from '../../infrastructure/store/user-recommendation/user-recommendation.selectors';
import * as UserRecommendationActions from '../../infrastructure/store/user-recommendation/user-recommendation.actions';

/**
 * Фасад для работы с рекомендациями
 */
@Injectable({
  providedIn: 'root',
})
export class UserRecommendationFacade implements UserRecommendationFacadeAbstract {
  all$ = this.store.select(UserRecommendationSelectors.getAll);
  loading$ = this.store.select(UserRecommendationSelectors.getLoading);
  loaded$ = this.store.select(UserRecommendationSelectors.getLoaded);
  selectedLoading$ = this.store.select(UserRecommendationSelectors.getSelectedLoading);

  // ========== Форма рекомендаций для пользователя ==========

  formData$ = this.store.select(UserRecommendationSelectors.getFormData);
  formLoading$ = this.store.select(UserRecommendationSelectors.getFormLoading);
  formDisplay$ = this.store.select(UserRecommendationSelectors.getFormDisplayForm);
  formError$ = this.store.select(UserRecommendationSelectors.getFormError);

  constructor(private store: Store<UserRecommendationFeature.UserRecommendationPartialState>) {}

  loadAll() {
    this.store.dispatch(UserRecommendationActions.loadAll());
  }

  edit(id: number) {
    this.store.dispatch(UserRecommendationActions.select({ id, edit: true }));
  }

  initForm() {
    this.store.dispatch(UserRecommendationActions.initForm({}));
  }

  closeForm() {
    this.store.dispatch(UserRecommendationActions.closeForm());
  }

  changeForm(formData: UserRecommendationViewForm) {
    this.store.dispatch(UserRecommendationActions.changeForm({ formData }));
  }

  saveForm() {
    this.store.dispatch(UserRecommendationActions.saveForm());
  }

  destroy(id: number) {
    this.store.dispatch(UserRecommendationActions.destroy({ id }));
  }

  reorder(oldIndex: number, newIndex: number) {
    this.store.dispatch(UserRecommendationActions.reorder({ oldIndex, newIndex }));
  }
}
