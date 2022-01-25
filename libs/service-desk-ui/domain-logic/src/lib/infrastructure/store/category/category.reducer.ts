import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CategoryActions from './category.actions';
import { Category } from '../../../entities/models/category.interface';

export const CATEGORY_FEATURE_KEY = 'category';

export interface FormState {
  formData: Category;
  loading: boolean;
  displayForm: boolean;
  error?: string;
}

export interface State extends EntityState<Category> {
  loading: boolean;
  loaded: boolean;
  form: FormState;
  loadingIds: number[];
  selectedId?: number;
  error?: string | null;
}

export interface CategoryPartialState {
  readonly [CATEGORY_FEATURE_KEY]: State;
}

export const categoryAdapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialFormState: FormState = {
  formData: null,
  loading: false,
  displayForm: false,
};

export const initialState: State = categoryAdapter.getInitialState({
  loading: false,
  loaded: false,
  form: initialFormState,
  loadingIds: [],
});

const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.setAll, (state, { categories }) => categoryAdapter.setAll(categories, state)),
  on(CategoryActions.loadAll, CategoryActions.loadSelected, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(CategoryActions.loadAllSuccess, (state, { entities, ids }) => ({
    ...state,
    entities,
    ids,
    loaded: true,
    loading: false,
  })),
  on(CategoryActions.loadAllFailure, CategoryActions.loadSelectedFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CategoryActions.loadSelectedSuccess, (state, { category }) =>
    categoryAdapter.setOne(category, {
      ...state,
      selectedId: category.id,
      loaded: true,
      loading: false,
    })
  ),
  on(CategoryActions.setEntities, (state, { entities }) => ({
    ...state,
    entities,
    ids: Object.keys(entities).map(Number),
  })),
  on(CategoryActions.setOne, (state, { category }) => categoryAdapter.setOne(category, state)),
  on(CategoryActions.setSelectedId, (state, { selectedId }) => ({ ...state, selectedId })),

  // ========== Администрирование ==========

  on(CategoryActions.adminLoadAll, (state) => ({
    ...state,
    loaded: false,
    loading: true,
    error: null,
  })),
  on(CategoryActions.adminLoadAllSuccess, (state, { categories }) =>
    categoryAdapter.setAll(categories, {
      ...state,
      loaded: true,
      loading: false,
    })
  ),
  on(CategoryActions.adminLoadAllFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(CategoryActions.adminSelect, (state, { id }) => ({ ...state, selectedId: id })),
  on(CategoryActions.adminLoadSelected, (state) => ({
    ...state,
    loadingIds: [...state.loadingIds, state.selectedId],
  })),
  on(CategoryActions.adminLoadSelectedSuccess, (state, { category }) =>
    categoryAdapter.setOne(category, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => loadingId !== category.id),
    })
  ),
  on(CategoryActions.adminLoadSelectedFailure, (state, { error }) => ({
    ...state,
    selectedId: null,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== state.selectedId),
    error,
  })),
  on(CategoryActions.adminDestroy, (state, { id }) => ({
    ...state,
    loadingIds: [...state.loadingIds, id],
  })),
  on(CategoryActions.adminDestroySuccess, (state, { id }) =>
    categoryAdapter.removeOne(id, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
    })
  ),
  on(CategoryActions.adminDestroyFailure, (state, { id }) => ({
    ...state,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
  })),

  // ========== Форма рекомендаций для пользователя ==========

  on(CategoryActions.adminInitForm, (state, { category }) => ({
    ...state,
    form: {
      ...initialFormState,
      formData: category,
      displayForm: true,
    },
  })),
  on(CategoryActions.adminCloseForm, (state) => ({
    ...state,
    selectedId: null,
    form: {
      ...state.form,
      displayForm: false,
      formData: null,
    },
  })),
  on(CategoryActions.adminChangeForm, (state, { formData }) => ({
    ...state,
    form: {
      ...state.form,
      formData: formData,
    },
  })),
  on(CategoryActions.adminSaveForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
      error: null,
    },
  })),
  on(CategoryActions.adminSaveFormSuccess, (state, { category }) =>
    categoryAdapter.setOne(category, {
      ...state,
      form: {
        ...state.form,
        loading: false,
      },
    })
  ),
  on(CategoryActions.adminSaveFormFailure, (state, { error }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      error,
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return categoryReducer(state, action);
}
