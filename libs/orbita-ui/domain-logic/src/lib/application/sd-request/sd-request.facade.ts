import { LazyLoadEvent } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, withLatestFrom, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestFeature from '../../infrastructure/store/sd-request/sd-request.reducer';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import * as SdRequestViewModelSelectors from '../../infrastructure/store/selectors/sd-request-view-model.selectors';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { NewSdRequestViewForm } from './../../entities/forms/new-sd-request-view-form.interface';
import { processSdRequestTableFilters } from '../../infrastructure/utils/process-sd-request-table-filters.function';
import { StreamService } from './../../infrastructure/stream/stream.service';

/**
 * Фасад для работы с заявками (обращения к хранилищу SdRequest)
 */
@Injectable({
  providedIn: 'root',
})
export class SdRequestFacade implements SdRequestFacadeAbstract {
  // ========== Список заявок ==========

  totalCount$ = this.store.select(SdRequestSelectors.getTotalCount);
  loading$ = this.store.select(SdRequestSelectors.getLoading);
  loaded$ = this.store.select(SdRequestSelectors.getLoaded);
  all$ = this.store.select(SdRequestViewModelSelectors.getAllViewModel);
  error$ = this.store.select(SdRequestSelectors.getError);

  // ========== Просмотр выбранной заявки ==========

  selectedEntity$ = this.store.select(SdRequestViewModelSelectors.getSelectedEntityViewModel);
  selectedSkeleton$ = this.store.select(SdRequestSelectors.getSelectedSkeleton);
  selectedEditMode$ = this.store.select(SdRequestSelectors.getSelectedEditMode);
  selectedError$ = this.store.select(SdRequestSelectors.getSelectedError);

  // ========== Форма существующей заявки ==========

  formEntity$ = this.store.select(SdRequestViewModelSelectors.getFormEntityViewModel).pipe(
    withLatestFrom(this.store.select(SdRequestSelectors.getFormUpdateView)),
    filter(([_form, updateView]) => updateView),
    map(([form, _updateView]) => form)
  );
  formLoading$ = this.store.select(SdRequestSelectors.getFormLoading);
  formNeedToGetNewData$ = this.store.select(SdRequestSelectors.getNeedToGetNewData);

  // ========== Форма новой заявки ==========

  newFormEntity$ = this.store.select(SdRequestSelectors.getNewFormEntity);
  newFormLoading$ = this.store.select(SdRequestSelectors.getNewFormLoading);
  newFormCreated$ = this.store.select(SdRequestViewModelSelectors.getNewFormCreatedViewModel);
  newFormShowModalAfterCreate$ = this.store.select(SdRequestSelectors.getNewFormShowModalAfterCreate);

  constructor(private store: Store<SdRequestFeature.SdRequestPartialState>, private streamService: StreamService) {}

  loadSdRequestsTable(event: LazyLoadEvent) {
    const data = JSON.parse(JSON.stringify(event));
    data.filters = event.filters ? processSdRequestTableFilters(data.filters) : {};

    this.store.dispatch(SdRequestActions.loadAll({ data: data }));
  }

  loadFiltered(event: LazyLoadEvent) {
    this.store.dispatch(SdRequestActions.loadAll({ data: event }));
  }

  loadSelectedSdRequest() {
    this.store.dispatch(SdRequestActions.loadSelected());
  }

  clearSelected() {
    this.store.dispatch(SdRequestActions.clearSelected());
  }

  toggleEditMode() {
    this.store.dispatch(SdRequestActions.toggleSelectedEditMode());
  }

  changeForm(form: SdRequestViewForm) {
    this.store.dispatch(SdRequestActions.changeForm({ entity: form }));
  }

  updateForm() {
    this.store.dispatch(SdRequestActions.saveUpdateForm());
  }

  clearAll() {
    this.store.dispatch(SdRequestActions.clearAll());
  }

  initNewForm() {
    this.store.dispatch(SdRequestActions.initNewForm());
  }

  changeNewForm(form: NewSdRequestViewForm) {
    this.store.dispatch(SdRequestActions.changeNewForm({ entity: form }));
  }

  createForm() {
    this.store.dispatch(SdRequestActions.saveNewForm());
  }

  closeModalAfterCreateSdRequest(): void {
    this.store.dispatch(SdRequestActions.closeModalAfterCreateNewForm());
  }

  clearCreatedForm() {
    this.store.dispatch(SdRequestActions.clearNewForm());
  }

  connectToSdRequestsCreateChannel(): Subscription {
    const channel = this.streamService.cable.channel('SdRequests::CreateChannel');

    return channel.received().subscribe((data) => {
      this.store.dispatch(SdRequestActions.processWebSocketOnCreate());
    });
  }

  connectToSdRequestsUpdateChannel(): Subscription {
    const channel = this.streamService.cable.channel('SdRequests::UpdateChannel');

    return channel.received().subscribe((data) => {
      this.store.dispatch(SdRequestActions.processWebSocketOnUpdate({ sdRequest: data.payload }));
    });
  }

  reinitUpdateForm() {
    this.store.dispatch(SdRequestActions.reinitUpdateForm());
  }
}
