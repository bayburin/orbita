import { createAction, props } from '@ngrx/store';

import { UserRecommendation } from '../../../entities/model/user-recommendation.interface';

export const loadAll = createAction('[UserRecommendation/API] Load All');

export const loadAllSuccess = createAction(
  '[UserRecommendation/API] Load All Success',
  props<{ recommendations: UserRecommendation[] }>()
);

export const loadAllFailure = createAction('[UserRecommendation/API] Load All Failure', props<{ error: any }>());
