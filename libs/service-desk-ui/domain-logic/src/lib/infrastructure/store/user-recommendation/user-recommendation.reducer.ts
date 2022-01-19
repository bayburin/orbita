import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import { UserRecommendation } from '../../../entities/models/user-recommendation.interface';
import { UserRecommendationViewForm } from './../../../entities/form/user-recommendation-view-form.interface';
import { UserRecommendationFactory } from './../../factories/user-recommendation.factory';
import * as UserRecommendationActions from './user-recommendation.actions';

export const USER_RECOMMENDATION_FEATURE_KEY = 'userRecommendation';

export interface FormState {
  formData: UserRecommendationViewForm;
  loading: boolean;
  displayForm: boolean;
  error?: string;
}

export interface State extends EntityState<UserRecommendation> {
  loading: boolean;
  loaded: boolean;
  form: FormState;
  loadingIds: number[];
  error?: string | null;
  selectedId?: number;
}

export interface UserRecommendationPartialState {
  readonly [USER_RECOMMENDATION_FEATURE_KEY]: State;
}

export const userRecommendationAdapter: EntityAdapter<UserRecommendation> = createEntityAdapter<UserRecommendation>({
  sortComparer: (a: UserRecommendation, b: UserRecommendation) => (a.order > b.order ? 1 : -1),
});

export const initialFormState: FormState = {
  formData: null,
  loading: false,
  displayForm: false,
};

export const initialState: State = userRecommendationAdapter.getInitialState({
  loading: false,
  loaded: false,
  form: initialFormState,
  loadingIds: [],
});

const userRecommendationReducer = createReducer(
  initialState,
  on(UserRecommendationActions.setAll, (state, { recommendations }) =>
    userRecommendationAdapter.setAll(recommendations, state)
  ),
  on(UserRecommendationActions.loadAll, (state) => ({ ...state, loaded: false, loading: true, error: null })),
  on(UserRecommendationActions.loadAllSuccess, (state, { recommendations }) =>
    userRecommendationAdapter.setAll(recommendations, { ...state, loaded: true, loading: false })
  ),
  on(UserRecommendationActions.loadAllFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(UserRecommendationActions.select, (state, { id }) => ({ ...state, selectedId: id })),
  on(UserRecommendationActions.loadSelected, (state) => ({
    ...state,
    loadingIds: [...state.loadingIds, state.selectedId],
  })),
  on(UserRecommendationActions.loadSelectedSuccess, (state, { recommendation }) =>
    userRecommendationAdapter.setOne(recommendation, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => loadingId !== recommendation.id),
    })
  ),
  on(UserRecommendationActions.loadSelectedFailure, (state, { error }) => ({
    ...state,
    selectedId: null,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== state.selectedId),
    error,
  })),
  on(UserRecommendationActions.destroy, (state, { id }) => ({
    ...state,
    loadingIds: [...state.loadingIds, id],
  })),
  on(UserRecommendationActions.destroySuccess, (state, { id }) =>
    userRecommendationAdapter.removeOne(id, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
    })
  ),
  on(UserRecommendationActions.destroyFailure, (state, { id }) => ({
    ...state,
    loadingIds: state.loadingIds.filter((loadingId) => loadingId !== id),
  })),
  on(UserRecommendationActions.reorderStart, (state, { data }) => ({
    ...state,
    loadingIds: [...state.loadingIds, ...data.map((el) => el.id)],
  })),
  on(UserRecommendationActions.reorderSuccess, (state, { recommendations }) => {
    const ids = recommendations.map((rec) => rec.id);

    return userRecommendationAdapter.setMany(recommendations, {
      ...state,
      loadingIds: state.loadingIds.filter((loadingId) => !ids.includes(loadingId)),
    });
  }),
  on(UserRecommendationActions.reorderFailure, (state, { ids }) => ({
    ...state,
    loadingIds: state.loadingIds.filter((loadingId) => !ids.includes(loadingId)),
  })),

  // ========== Форма рекомендаций для пользователя ==========

  on(UserRecommendationActions.initForm, (state, { recommendation }) => ({
    ...state,
    form: {
      ...initialFormState,
      formData: UserRecommendationFactory.createViewForm(recommendation),
      displayForm: true,
    },
  })),
  on(UserRecommendationActions.closeForm, (state) => ({
    ...state,
    selectedId: null,
    form: {
      ...state.form,
      displayForm: false,
      formData: null,
    },
  })),
  on(UserRecommendationActions.changeForm, (state, { formData }) => ({
    ...state,
    form: {
      ...state.form,
      formData: formData,
    },
  })),
  on(UserRecommendationActions.saveForm, (state) => ({
    ...state,
    form: {
      ...state.form,
      loading: true,
      error: null,
    },
  })),
  on(UserRecommendationActions.saveFormSuccess, (state, { recommendation }) =>
    userRecommendationAdapter.setOne(recommendation, {
      ...state,
      form: {
        ...state.form,
        loading: false,
      },
    })
  ),
  on(UserRecommendationActions.saveFormFailure, (state, { error }) => ({
    ...state,
    form: {
      ...state.form,
      loading: false,
      error,
    },
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return userRecommendationReducer(state, action);
}
