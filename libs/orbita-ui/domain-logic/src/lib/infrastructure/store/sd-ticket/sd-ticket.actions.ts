import { createAction, props } from '@ngrx/store';

import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

export const loadAll = createAction('[SdTicket/API] Load All');

export const loadAllSuccess = createAction('[SdTicket/API] Load All Success', props<{ tickets: SdTicket[] }>());

export const loadAllFailure = createAction('[SdTicket/API] Load All Failure', props<{ error: any }>());
