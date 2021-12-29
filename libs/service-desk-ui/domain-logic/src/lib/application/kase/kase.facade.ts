import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { KaseFacadeAbstract } from './kase.facade.abstract';
import { KaseViewForm } from '../../entities/form/kase-view-form.interface';
import * as KaseFeature from '../../infrastructure/store/kase/kase.reducer';
import * as KaseSelectors from '../../infrastructure/store/kase/kase.selectors';
import * as KaseActions from '../../infrastructure/store/kase/kase.actions';

/**
 * Фасад для работы с заявками
 */
@Injectable({
  providedIn: 'root',
})
export class KaseFacade implements KaseFacadeAbstract {
  // ========== Список заявок ==========

  all$ = this.store.select(KaseSelectors.getAll);
  initLoading$ = this.store.select(KaseSelectors.getInitLoading);
  loading$ = this.store.select(KaseSelectors.getLoading);
  loaded$ = this.store.select(KaseSelectors.getLoaded);
  statuses$ = this.store.select(KaseSelectors.getStatuses);
  selectedStatusId$ = this.store.select(KaseSelectors.getSelectedStatusId);
  isAnyKase$ = this.store.select(KaseSelectors.getIsAnyKase);

  // ========== Форма новой заявки ==========

  formEntity$ = this.store.select(KaseSelectors.getFormEntity);
  formSvtItems$ = this.store.select(KaseSelectors.getFormSvtItems);
  formLoadingParams$ = this.store.select(KaseSelectors.getFormLoading);
  formErrorParams$ = this.store.select(KaseSelectors.getFormError);

  constructor(private store: Store<KaseFeature.KasePartialState>) {}

  init() {
    this.store.dispatch(KaseActions.init());
  }

  revoke(caseId: number) {
    this.store.dispatch(KaseActions.revoke({ caseId }));
  }

  vote(caseId: number, rating: number) {
    this.store.dispatch(KaseActions.vote({ caseId, rating }));
  }

  setSelectedStatusId(selectedStatusId: number) {
    this.store.dispatch(KaseActions.setSelectedStatusId({ selectedStatusId }));
  }

  clearSelectedServices() {
    this.store.dispatch(KaseActions.setServiceIds({ serviceIds: [] }));
  }

  initNewForm() {
    this.store.dispatch(KaseActions.initNewForm());
  }

  changeForm(formData: KaseViewForm) {
    this.store.dispatch(KaseActions.changeForm({ formData }));
  }

  saveForm() {
    this.store.dispatch(KaseActions.saveForm());
  }
}
