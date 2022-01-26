import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { Service } from '../../../entities/models/service.interface';
import { ServiceForm } from '../../../entities/form/service-form.interface';
import { ServiceFactory } from '../../factories/service.factory';
import * as ServiceActions from './service.actions';

export const SERVICE_FEATURE_KEY = 'service';

export interface FormState {
  formData: ServiceForm;
  loading: boolean;
  displayForm: boolean;
  error?: string;
}

export interface State extends EntityState<Service> {
  selectedId?: number;
  loading: boolean;
  loaded: boolean;
  form: FormState;
  loadingIds: number[];
  error?: string | null;
}

export interface ServicePartialState {
  readonly [SERVICE_FEATURE_KEY]: State;
}

export const serviceAdapter: EntityAdapter<Service> = createEntityAdapter<Service>();

export const initialFormState: FormState = {
  formData: null,
  loading: false,
  displayForm: false,
};

export const initialState: State = serviceAdapter.getInitialState({
  loading: false,
  loaded: false,
  form: initialFormState,
  loadingIds: [],
});

const serviceReducer = createReducer(
  initialState,
  on(ServiceActions.setEntities, (state, { entities }) => ({
    ...state,
    entities,
    ids: Object.keys(entities).map(Number),
  })),
  on(ServiceActions.loadSelected, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(ServiceActions.loadSelectedSuccess, (state, { service }) =>
    serviceAdapter.setOne(service, { ...state, selectedId: service.id, loaded: true, loading: false })
  ),
  on(ServiceActions.loadSelectedFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(ServiceActions.setAll, (state, { services }) => serviceAdapter.setAll(services, state)),

  // ========== Администрирование ==========

  on(ServiceActions.adminLoadAll, ServiceActions.adminLoadSelectedForEditTickets, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(ServiceActions.adminLoadAllSuccess, (state, { entities, ids }) => ({
    ...state,
    loaded: true,
    loading: false,
    entities,
    ids,
  })),
  on(ServiceActions.adminLoadAllFailure, ServiceActions.adminLoadSelectedForEditTicketsFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(ServiceActions.adminSelectForEdit, (state, { id }) => ({ ...state, selectedId: id })),
  on(ServiceActions.adminLoadSelectedForEdit, (state) => ({
    ...state,
    loadingIds: [...state.loadingIds, state.selectedId],
  })),
  on(ServiceActions.adminLoadSelectedForEditSuccess, (state, { service }) =>
    serviceAdapter.setOne(service, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => loadingId !== service.id),
    })
  ),
  on(ServiceActions.adminLoadSelectedForEditFailure, (state, { error }) => ({
    ...state,
    selectedId: null,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== state.selectedId),
    error,
  })),
  on(ServiceActions.adminLoadSelectedForEditTicketsSuccess, (state, { service }) =>
    serviceAdapter.setOne(service, { ...state, loaded: true, loading: false, selectedId: service.id })
  ),
  on(ServiceActions.adminDestroyWithDestroyedCategory, (state, { categoryId }) =>
    serviceAdapter.removeMany((service) => service.category_id === categoryId, state)
  ),
  on(ServiceActions.adminDestroy, (state, { id }) => ({
    ...state,
    loadingIds: [...state.loadingIds, id],
  })),
  on(ServiceActions.adminDestroySuccess, (state, { id }) =>
    serviceAdapter.removeOne(id, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
    })
  ),
  on(ServiceActions.adminDestroyFailure, (state, { id }) => ({
    ...state,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
  })),

  // ========== Форма рекомендаций для пользователя ==========

  on(ServiceActions.adminInitForm, (state, { service }) => ({
    ...state,
    form: {
      ...initialFormState,
      formData: ServiceFactory.createViewForm(service),
      displayForm: true,
    },
  })),
  on(ServiceActions.adminCloseForm, (state) => ({
    ...state,
    selectedId: null,
    form: {
      ...state.form,
      displayForm: false,
      formData: null,
    },
  })),
  on(ServiceActions.adminChangeForm, (state, { formData }) => ({
    ...state,
    form: {
      ...state.form,
      formData: formData,
    },
  })),
  on(ServiceActions.adminSaveForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
      error: null,
    },
  })),
  on(ServiceActions.adminSaveFormSuccess, (state, { service }) =>
    serviceAdapter.setOne(service, {
      ...state,
      form: {
        ...state.form,
        loading: false,
      },
    })
  ),
  on(ServiceActions.adminSaveFormFailure, (state, { error }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      error,
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return serviceReducer(state, action);
}
