import { createAction, props } from '@ngrx/store';

import { EventType } from './../../../entities/models/event-type.interface';

export const setAll = createAction(
  '[EventType] Set All',
  props<{ event_types: EventType[] }>()
);
