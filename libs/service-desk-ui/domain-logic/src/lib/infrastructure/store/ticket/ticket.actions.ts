import { createAction, props } from '@ngrx/store';

import { Ticket } from '../../../entities/models/ticket.interface';

export const setAll = createAction('[Ticket] Set All', props<{ tickets: Ticket[] }>());

export const loadSelected = createAction('[Ticket/API] Load Selected');

export const loadSelectedSuccess = createAction('[Ticket/API] Load Selected Success', props<{ ticket: Ticket }>());

export const loadSelectedFailure = createAction('[Ticket/API] Load Selected Failure', props<{ error: string }>());
