import { createAction, props } from '@ngrx/store';

import { Message } from '../../../entities/models/message.interface';

export const setAll = createAction(
  '[Message] Set All',
  props<{ messages: Message[] }>()
);
