import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AdminServiceFacadeAbstract } from './admin-service.facade.abstract';
import { ServiceForm } from '../../../entities/form/service-form.interface';
import * as ServiceFeature from '../../../infrastructure/store/service/service.reducer';
import * as ServiceSelectors from '../../../infrastructure/store/service/service.selectors';
import * as ServiceActions from '../../../infrastructure/store/service/service.actions';
import * as VMSelectors from '../../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с услугами
 */
@Injectable({
  providedIn: 'root',
})
export class AdminServiceFacade implements AdminServiceFacadeAbstract {
  all$ = this.store
    .select(VMSelectors.getAllServicesVM)
    .pipe(map((services) => services.sort((a, b) => (a.id > b.id ? -1 : 1))));
  selected$ = this.store.select(VMSelectors.getSelectedOverviewServiceVM);
  loading$ = this.store.select(ServiceSelectors.getLoading);
  loaded$ = this.store.select(ServiceSelectors.getLoaded);
  loadingIds$ = this.store.select(ServiceSelectors.getLoadingIds);

  // ========== Форма рекомендаций для пользователя ==========

  formData$ = this.store.select(ServiceSelectors.getFormData);
  formLoading$ = this.store.select(ServiceSelectors.getFormLoading);
  formDisplay$ = this.store.select(ServiceSelectors.getFormDisplayForm);
  formError$ = this.store.select(ServiceSelectors.getFormError);

  constructor(private store: Store<ServiceFeature.ServicePartialState>) {}

  loadAll() {
    this.store.dispatch(ServiceActions.adminLoadAll());
  }

  edit(id: number) {
    this.store.dispatch(ServiceActions.adminSelectForEdit({ id }));
  }

  show() {
    this.store.dispatch(ServiceActions.adminLoadSelectedForEditTickets());
  }

  initForm() {
    this.store.dispatch(ServiceActions.adminInitForm({}));
  }

  closeForm() {
    this.store.dispatch(ServiceActions.adminCloseForm());
  }

  changeForm(formData: ServiceForm) {
    this.store.dispatch(ServiceActions.adminChangeForm({ formData }));
  }

  saveForm() {
    this.store.dispatch(ServiceActions.adminSaveForm());
  }

  destroy(id: number) {
    this.store.dispatch(ServiceActions.adminDestroy({ id }));
  }
}
