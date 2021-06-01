import { createAction, props } from '@ngrx/store';

import { History } from '../../../entities/models/history.interface';

export const setAll = createAction(
  '[History] Set All',
  props<{ histories: History[] }>()
);
