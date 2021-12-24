import { createAction, props } from '@ngrx/store';

import { Ticket } from '../../../entities/models/ticket.interface';

export const setAll = createAction('[Ticket] Set All', props<{ tickets: Ticket[] }>());
