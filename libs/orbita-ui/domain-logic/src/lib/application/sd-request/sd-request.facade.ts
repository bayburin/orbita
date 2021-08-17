import { LazyLoadEvent } from 'primeng/api';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { tap, switchMap, catchError, map, withLatestFrom, share, startWith, filter } from 'rxjs/operators';
import { muteFirst } from '@orbita/orbita-ui/utils';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';
import * as SdRequestActions from '../../infrastructure/store/sd-request/sd-request.actions';
import * as SdRequestFeature from '../../infrastructure/store/sd-request/sd-request.reducer';
import * as SdRequestSelectors from '../../infrastructure/store/sd-request/sd-request.selectors';
import * as SdRequestViewModelSelectors from '../../infrastructure/store/selectors/sd-request-view-model.selectors';
import { SdRequestApi } from './../../infrastructure/api/sd-request/sd-request.api';
import { SdRequestCacheService } from './../../infrastructure/services/sd-request-cache.service';
import { SdRequestViewForm } from './../../entities/forms/sd-request-view-form.interface';
import { NewSdRequestViewForm } from './../../entities/forms/new-sd-request-view-form.interface';
import { convertPrimeFilter } from './../../infrastructure/utils/convert-prime-filter.function';

/**
 * Фасад для работы с заявками (обращения к хранилищу SdRequest)
 */
@Injectable({
  providedIn: 'root',
})
export class SdRequestFacade implements SdRequestFacadeAbstract {
  // ========== Список заявок ==========

  firstRowIndex$ = this.store.select(SdRequestSelectors.getFirstRowIndex);
  totalCount$ = this.store.select(SdRequestSelectors.getTotalCount);
  perPage$ = this.store.select(SdRequestSelectors.getPerPage);
  sortField$ = this.store.select(SdRequestSelectors.getSortField);
  sortOrder$ = this.store.select(SdRequestSelectors.getSortOrder);
  loading$ = this.store.select(SdRequestSelectors.getLoading);
  loaded$ = this.store.select(SdRequestSelectors.getLoaded);
  loadSdRequests$ = this.store.select(SdRequestSelectors.getNeedTickets).pipe(
    filter((needTickets) => needTickets),
    tap(() => this.store.dispatch(SdRequestActions.loadAll())),
    withLatestFrom(
      this.store.select(SdRequestSelectors.getPage),
      this.perPage$,
      this.store.select(SdRequestSelectors.getFilters)
    ),
    switchMap(([_need, page, perPage, filters]) =>
      this.sdRequestApi.query(page, perPage, convertPrimeFilter(filters)).pipe(
        tap((data) => {
          const normalizeData = SdRequestCacheService.normalizeSdRequests(data.sd_requests).entities;

          this.store.dispatch(SdRequestActions.setPartials({ entities: normalizeData }));
          this.store.dispatch(
            SdRequestActions.loadAllSuccess({
              sdRequests: Object.values(normalizeData.sd_requests || []),
              meta: data.meta,
            })
          );
        }),
        catchError((error) => of(this.store.dispatch(SdRequestActions.loadAllFailure({ error }))))
      )
    ),
    share()
  );

  all$ = muteFirst(
    this.loadSdRequests$.pipe(startWith(null)),
    this.store.select(SdRequestViewModelSelectors.getAllViewModel)
  );
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

  // ========== Форма новой заявки ==========

  newFormEntity$ = this.store.select(SdRequestSelectors.getNewFormEntity);
  newFormLoading$ = this.store.select(SdRequestSelectors.getNewFormLoading);
  newFormCreated$ = this.store.select(SdRequestViewModelSelectors.getNewFormCreatedViewModel);
  newFormShowModalAfterCreate$ = this.store.select(SdRequestSelectors.getNewFormShowModalAfterCreate);

  constructor(private store: Store<SdRequestFeature.SdRequestPartialState>, private sdRequestApi: SdRequestApi) {}

  setTableMetadata(event: LazyLoadEvent) {
    this.store.dispatch(SdRequestActions.setTableMetadata({ data: event }));
  }

  reloadTableData() {
    this.store.dispatch(SdRequestActions.reloadEntities());
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
}
