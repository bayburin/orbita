import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';

import * as SdRequestActions from './sd-request.actions';
import { SdRequest } from '../../../entities/models/sd-request.interface';
import { SdRequestForm } from './../../../entities/forms/sd-request-form.interface';
import { PrimeFilter } from './../../../entities/prime-filter.interface';
import { processSdRequestTableFilters } from '../../utils/process-sd-request-table-filters.function';
import { SdRequestFormBuilder } from './../../builders/sd-request-form.builder';

export const SD_REQUEST_FEATURE_KEY = 'sdRequest';

export interface SelectedState {
  entity: SdRequest;
  skeleton: boolean;
  editMode: boolean;
  error?: string;
}

export interface FormState {
  entity: SdRequestForm;
  loading: boolean;
  error?: string;
}

export interface State extends EntityState<SdRequest> {
  firstRowIndex: number;
  totalCount: number;
  perPage: number;
  sortField: string;
  sortOrder: number;
  filters: PrimeFilter;
  loading: boolean;
  loaded: boolean;
  needTickets: boolean;
  error?: string;
  selected?: SelectedState;
  form?: FormState;
}

export interface SdRequestPartialState {
  readonly [SD_REQUEST_FEATURE_KEY]: State;
}

export const initSelectedState: SelectedState = {
  entity: null,
  skeleton: false,
  editMode: false,
};

export const initFormState: FormState = {
  entity: null,
  loading: false,
};

export const sdRequestAdapter: EntityAdapter<SdRequest> = createEntityAdapter<SdRequest>();

export const initialState: State = sdRequestAdapter.getInitialState({
  firstRowIndex: 0,
  totalCount: 0,
  sortField: 'id',
  sortOrder: -1,
  perPage: 25,
  filters: {},
  loading: false,
  loaded: false,
  needTickets: true,
  selected: initSelectedState,
  form: initFormState,
});

const sdRequestReducer = createReducer(
  initialState,

  // ========== Список заявок ==========

  on(SdRequestActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    needTickets: false,
    error: null,
  })),
  on(SdRequestActions.loadAllSuccess, (state, { sdRequests, meta }) =>
    sdRequestAdapter.setAll(sdRequests, {
      ...state,
      totalCount: meta.total_count,
      loading: false,
      loaded: true,
    })
  ),
  on(SdRequestActions.loadAllFailure, (state, { error }) =>
    sdRequestAdapter.removeAll({
      ...state,
      error,
      loading: false,
    })
  ),
  on(SdRequestActions.SetTableMetadata, (state, { data }) => ({
    ...state,
    firstRowIndex: data.first,
    perPage: data.rows,
    sortField: data.sortField,
    sortOrder: data.sortOrder,
    filters: processSdRequestTableFilters(data.filters ? JSON.parse(JSON.stringify(data.filters)) : {}),
    needTickets: true,
  })),
  on(SdRequestActions.ReloadEntities, (state) => ({
    ...state,
    needTickets: true,
  })),

  // ========== Просмотр выбранной заявки ==========

  on(SdRequestActions.loadSelected, (state) => ({
    ...state,
    selected: {
      ...state.selected,
      entity: null,
      skeleton: true,
      error: null,
    },
  })),
  on(SdRequestActions.loadSelectedSuccess, (state, { sdRequest }) => ({
    ...state,
    selected: {
      ...state.selected,
      entity: sdRequest,
      skeleton: false,
    },
  })),
  on(SdRequestActions.loadSelectedFailure, (state, { error }) => ({
    ...state,
    selected: {
      ...state.selected,
      error,
      skeleton: false,
    },
  })),
  on(SdRequestActions.clearSelected, (state) => ({
    ...state,
    selected: {
      ...state.selected,
      entity: null,
    },
  })),
  on(SdRequestActions.toggleSelectedEditMode, (state) => ({
    ...state,
    selected: {
      ...state.selected,
      editMode: !state.selected.editMode,
    },
  })),
  on(SdRequestActions.disableSelectedEditMode, (state) => ({
    ...state,
    selected: {
      ...state.selected,
      editMode: false,
    },
  })),

  // ========== Форма заявки ==========

  on(SdRequestActions.initUpdateForm, (state, { sdRequestViewModel }) => ({
    ...state,
    form: {
      ...state.form,
      entity: SdRequestFormBuilder.build(sdRequestViewModel),
    },
  })),
  on(SdRequestActions.changeForm, (state, { entity }) => ({
    ...state,
    form: {
      ...state.form,
      entity: {
        ...entity,
        finished_at_plan: moment(entity.finished_at_plan).format(),
      },
    },
  })),
  on(SdRequestActions.saveUpdateForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
    },
  })),
  on(SdRequestActions.saveFormSuccess, (state, { sdRequest }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
    },
    selected: {
      ...state.selected,
      entity: sdRequest,
    },
  })),
  on(SdRequestActions.saveFormFailure, (state, { error }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      error,
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}
