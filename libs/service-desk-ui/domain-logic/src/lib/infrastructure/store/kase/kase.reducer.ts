import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as KaseActions from './kase.actions';
import { Kase } from '../../../entities/models/kase.interface';
import { Filter } from '../../../entities/filter.interface';
import { KaseViewForm } from '../../../entities/form/kase-view-form.interface';
import { SvtItem } from '../../../entities/models/svt/svt-item.interface';

export const KASE_FEATURE_KEY = 'kase';

export interface FormState {
  entity: KaseViewForm;
  loading: boolean;
  loaded: boolean;
  error?: string;
  svtItems: SvtItem[];
}

export interface State extends EntityState<Kase> {
  initLoading: boolean;
  loading: boolean;
  loaded: boolean;
  // Список id услуг, для которых необходимо загрузить заявки
  serviceIds: number[];
  // Id выбранного статуса
  selectedStatusId: number;
  statuses?: Filter[];
  // Данные формы для создания кейса
  form: FormState;
  error?: string | null;
}

export interface KasePartialState {
  readonly [KASE_FEATURE_KEY]: State;
}

export const kaseAdapter: EntityAdapter<Kase> = createEntityAdapter<Kase>({
  selectId: (kase: Kase) => kase.case_id,
});

export const initialFormState: FormState = {
  entity: null,
  loading: false,
  loaded: false,
  svtItems: [],
};

export const initialState: State = kaseAdapter.getInitialState({
  initLoading: false,
  loading: false,
  loaded: false,
  serviceIds: [],
  selectedStatusId: null,
  form: initialFormState,
});

const kaseReducer = createReducer(
  initialState,

  // ========== Список заявок ==========

  on(KaseActions.init, (state) => ({ ...state, loaded: false, initLoading: true, error: null })),
  on(KaseActions.loadAll, (state) => ({ ...state, loading: true, error: null })),
  on(KaseActions.loadAllSuccess, (state, { kases }) =>
    kaseAdapter.setAll(kases, { ...state, loaded: true, loading: false, initLoading: false })
  ),
  on(KaseActions.loadAllFailure, (state, { error }) => ({ ...state, loading: false, initLoading: false, error })),
  on(KaseActions.setStatuses, (state, { statuses }) => ({ ...state, statuses })),
  on(KaseActions.setServiceIds, (state, { serviceIds }) => ({ ...state, serviceIds })),
  on(KaseActions.revoke, KaseActions.vote, (state) => ({ ...state, loading: true })),
  on(KaseActions.revokeSuccess, KaseActions.voteSuccess, (state) => ({ ...state, loading: false })),
  on(KaseActions.revokeFailure, KaseActions.voteFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(KaseActions.setSelectedStatusId, (state, { selectedStatusId }) => ({ ...state, selectedStatusId })),

  // ========== Форма новой заявки ==========

  on(KaseActions.initNewForm, (state) => ({
    ...state,
    form: { ...initialFormState },
  })),
  on(KaseActions.loadParamsForNewForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
      loaded: false,
    },
  })),
  on(KaseActions.loadParamsForNewFormSuccess, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      loaded: true,
    },
  })),
  on(KaseActions.loadParamsForNewFormFailure, (state, { error }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      loaded: false,
      error,
    },
  })),
  on(KaseActions.setInitialDataToNewForm, (state, { formData }) => ({
    ...state,
    form: {
      ...state.form,
      entity: formData,
    },
  })),
  on(KaseActions.setSvtItems, (state, { svtItems }) => ({
    ...state,
    form: {
      ...state.form,
      svtItems,
    },
  })),
  on(KaseActions.changeForm, (state, { formData }) => ({
    ...state,
    form: {
      ...state.form,
      entity: formData,
    },
  })),
  on(KaseActions.saveForm, (state) => ({ ...state, loading: true, error: null })),
  on(KaseActions.saveFormSuccess, (state) => ({ ...state, loading: false })),
  on(KaseActions.saveFormFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return kaseReducer(state, action);
}
