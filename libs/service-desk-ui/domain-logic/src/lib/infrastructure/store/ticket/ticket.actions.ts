import { createAction, props } from '@ngrx/store';

import { Ticket } from '../../../entities/model/ticket.interface';

export const setAll = createAction('[Ticket] Set All', props<{ tickets: Ticket[] }>());
