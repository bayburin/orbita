import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as moment from 'moment';

import * as SdRequestActions from './sd-request.actions';
import { SdRequest } from '../../../entities/models/sd-request.interface';
import { SdRequestViewForm } from './../../../entities/forms/sd-request-view-form.interface';
import { SdRequestFactory } from './../../factories/sd-request.factory';
import { NewSdRequestViewForm } from './../../../entities/forms/new-sd-request-view-form.interface';

export const SD_REQUEST_FEATURE_KEY = 'sdRequest';

export interface SelectedState {
  skeleton: boolean;
  editMode: boolean;
  id: number;
  error?: string;
}

export interface FormState {
  entity: SdRequestViewForm;
  loading: boolean;
  error?: string;
  updateView: boolean;
  needToGetNewData: boolean;
}

export interface NewFormState {
  entity: NewSdRequestViewForm;
  loading: boolean;
  error?: string;
  created?: SdRequest;
  updateView: boolean;
  showModalAfterCreate: boolean;
}

export interface State extends EntityState<SdRequest> {
  totalCount: number;
  loading: boolean;
  loaded: boolean;
  error?: string;
  selected?: SelectedState;
  form?: FormState;
  newForm: NewFormState;
}

export interface SdRequestPartialState {
  readonly [SD_REQUEST_FEATURE_KEY]: State;
}

export const initSelectedState: SelectedState = {
  skeleton: false,
  editMode: false,
  id: null,
};

export const initFormState: FormState = {
  entity: null,
  loading: false,
  // Флаг, определяющий, передавать ли данные формы из стора в представление
  updateView: false,
  // Флаг, который определяет, показывать ли кнопку "Принять изменения" в режиме редактирования формы
  needToGetNewData: false,
};

export const initNewFormState: NewFormState = {
  entity: null,
  loading: false,
  // Флаг, определяющий, передавать ли данные формы из стора в представление
  updateView: false,
  showModalAfterCreate: false,
};

export const sdRequestAdapter: EntityAdapter<SdRequest> = createEntityAdapter<SdRequest>();

export const initialState: State = sdRequestAdapter.getInitialState({
  totalCount: 0,
  loading: false,
  loaded: false,
  selected: initSelectedState,
  form: initFormState,
  newForm: initNewFormState,
});

const sdRequestReducer = createReducer(
  initialState,

  // ========== Список заявок ==========

  on(SdRequestActions.loadAll, (state) => ({
    ...state,
    loaded: false,
    loading: true,
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
  on(SdRequestActions.clearAll, (state) =>
    sdRequestAdapter.removeAll({
      ...state,
      loaded: false,
    })
  ),
  on(SdRequestActions.addComment, (state, { id, commentId }) =>
    sdRequestAdapter.updateOne(
      { id, changes: { ...state.entities[id], comments: state.entities[id].comments.concat([commentId]) } },
      state
    )
  ),

  // ========== Просмотр выбранной заявки ==========

  on(SdRequestActions.loadSelected, (state) => ({
    ...state,
    selected: {
      ...state.selected,
      skeleton: true,
      error: null,
      id: null,
    },
  })),
  on(SdRequestActions.loadSelectedSuccess, (state, { sdRequest }) =>
    sdRequestAdapter.setOne(sdRequest, {
      ...state,
      selected: {
        ...state.selected,
        skeleton: false,
        id: sdRequest.id,
      },
    })
  ),
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
      id: null,
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

  // ========== Форма существующей заявки ==========

  on(SdRequestActions.initUpdateForm, (state, { sdRequestViewModel }) => ({
    ...state,
    form: {
      ...state.form,
      entity: SdRequestFactory.createViewForm(sdRequestViewModel),
      updateView: true,
      needToGetNewData: false,
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
      updateView: false,
    },
  })),
  on(SdRequestActions.saveUpdateForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
    },
  })),
  on(SdRequestActions.saveFormSuccess, (state, { sdRequest }) =>
    sdRequestAdapter.updateOne(
      { id: sdRequest.id, changes: sdRequest },
      {
        ...state,
        form: {
          ...state.form,
          loading: false,
          updateView: true,
        },
        selected: {
          ...state.selected,
          id: sdRequest.id,
        },
      }
    )
  ),
  on(SdRequestActions.saveFormFailure, (state, { error }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      error,
    },
  })),

  // ========== Форма новой заявки ==========

  on(SdRequestActions.initNewForm, (state) => ({
    ...state,
    newForm: {
      ...state.newForm,
      updateView: true,
    },
  })),
  on(SdRequestActions.setEmployeeToNewForm, (state, { employee }) => ({
    ...state,
    newForm: {
      ...state.newForm,
      entity: {
        ...state.newForm.entity,
        employee,
      },
    },
  })),
  on(SdRequestActions.setSvtItemToNewForm, (state, { svtItem }) => ({
    ...state,
    newForm: {
      ...state.newForm,
      entity: {
        ...state.newForm.entity,
        svtItem,
      },
    },
  })),
  on(SdRequestActions.changeNewForm, (state, { entity }) => ({
    ...state,
    newForm: {
      ...state.newForm,
      entity,
      updateView: false,
    },
  })),
  on(SdRequestActions.saveNewForm, (state) => ({
    ...state,
    newForm: {
      ...state.newForm,
      loading: true,
    },
  })),
  on(SdRequestActions.saveNewFormSuccess, (state, { sdRequest }) => ({
    ...state,
    newForm: {
      ...state.newForm,
      loading: false,
      created: sdRequest,
      updateView: true,
    },
  })),
  on(SdRequestActions.saveNewFormFailure, (state, { error }) => ({
    ...state,
    newForm: {
      ...state.newForm,
      loading: false,
      error,
    },
  })),
  on(SdRequestActions.showModalAfterCreateNewForm, (state) => ({
    ...state,
    newForm: {
      ...state.newForm,
      showModalAfterCreate: true,
    },
  })),
  on(SdRequestActions.closeModalAfterCreateNewForm, (state) => ({
    ...state,
    newForm: {
      ...state.newForm,
      showModalAfterCreate: false,
    },
  })),
  on(SdRequestActions.clearNewForm, (state) => ({
    ...state,
    newForm: { ...initNewFormState },
  })),

  // ========== Обновление данных по заявке ==========

  on(SdRequestActions.update, (state, { sdRequest, needToGetNewData }) =>
    sdRequestAdapter.updateOne(
      { id: sdRequest.id, changes: sdRequest },
      {
        ...state,
        form: {
          ...state.form,
          needToGetNewData,
        },
      }
    )
  )
);

export function reducer(state: State | undefined, action: Action) {
  return sdRequestReducer(state, action);
}
