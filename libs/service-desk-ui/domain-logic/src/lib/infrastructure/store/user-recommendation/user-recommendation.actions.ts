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

export const select = createAction('[UserRecommendation] Edit', props<{ id: number; edit?: boolean }>());

export const loadSelected = createAction('[UserRecommendation/API] Load Selected', props<{ edit: boolean }>());

export const loadSelectedSuccess = createAction(
  '[UserRecommendation/API] Load Selected Success',
  props<{ recommendation: UserRecommendation; edit: boolean }>()
);

export const loadSelectedFailure = createAction(
  '[UserRecommendation/API] Load Selected Failure',
  props<{ error: any }>()
);

export const destroy = createAction('[UserRecommendation/API] Destroy', props<{ id: number }>());

export const destroySuccess = createAction('[UserRecommendation/API] Destroy Success', props<{ id: number }>());

export const destroyFailure = createAction('[UserRecommendation/API] Destroy Failure', props<{ error: any }>());

export const reorder = createAction(
  '[UserRecommendation/API] Reorder',
  props<{ oldIndex: number; newIndex: number }>()
);

export const reorderSuccess = createAction(
  '[UserRecommendation/API] Reorder Success',
  props<{ recommendations: UserRecommendation[] }>()
);

export const reorderFailure = createAction('[UserRecommendation/API] Reorder Failure', props<{ error: any }>());

// ========== Форма рекомендаций для пользователя ==========

export const initForm = createAction(
  '[UserRecommendation] Init Form',
  props<{ recommendation?: UserRecommendation }>()
);

export const closeForm = createAction('[UserRecommendation] Close Form');

export const changeForm = createAction(
  '[UserRecommendation] Change Form',
  props<{ formData: UserRecommendationViewForm }>()
);

export const saveForm = createAction('[UserRecommendation/API] Save Form');

export const saveFormSuccess = createAction(
  '[UserRecommendation/API] Save Form Success',
  props<{ recommendation: UserRecommendation }>()
);

export const saveFormFailure = createAction('[UserRecommendation/API] Save Form Failure', props<{ error: any }>());
