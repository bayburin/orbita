import { createAction, props } from '@ngrx/store';

import { UserRecommendation } from '../../../entities/models/user-recommendation.interface';
import { UserRecommendationViewForm } from '../../../entities/form/user-recommendation-view-form.interface';

export const setAll = createAction('[UserRecommendation] Set All', props<{ recommendations: UserRecommendation[] }>());

export const loadAll = createAction('[UserRecommendation/API] Load All');

export const loadAllSuccess = createAction(
  '[UserRecommendation/API] Load All Success',
  props<{ recommendations: UserRecommendation[] }>()
);

export const loadAllFailure = createAction('[UserRecommendation/API] Load All Failure', props<{ error: any }>());

// ========== Форма рекомендаций для пользователя ==========

export const initForm = createAction('[UserRecommendation] Init Form');

export const closeForm = createAction('[UserRecommendation] Close Form');

export const changeForm = createAction(
  '[UserRecommendation] Change Form',
  props<{ formData: UserRecommendationViewForm }>()
);

export const saveForm = createAction('[UserRecommendation/API] Save Form');

export const saveFormSuccess = createAction('[UserRecommendation/API] Save Form Success');

export const saveFormFailure = createAction('[UserRecommendation/API] Save Form Failure', props<{ error: any }>());
