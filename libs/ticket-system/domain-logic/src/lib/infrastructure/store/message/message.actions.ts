import { createAction, props } from '@ngrx/store';

import { MessageQueue } from '../../../entities/message.interface';

export const init = createAction('[Message/API] Load All');

export const loadAllSuccess = createAction(
  '[Message/API] Load All Success',
  props<{ messageQueue: MessageQueue }>()
);

export const loadAllFailure = createAction(
  '[Message/API] Load All Failure',
  props<{ error: any }>()
);
