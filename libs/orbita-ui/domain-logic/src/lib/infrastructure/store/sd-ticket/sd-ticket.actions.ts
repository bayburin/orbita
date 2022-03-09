import { createAction, props } from '@ngrx/store';

import { SdTicket } from './../../../entities/models/sd/sd-ticket.interface';

export const loadAll = createAction('[SdTicket/API] Load All');

export const loadAllSuccess = createAction('[SdTicket/API] Load All Success', props<{ tickets: SdTicket[] }>());

export const loadAllFailure = createAction('[SdTicket/API] Load All Failure', props<{ error: any }>());

export const selectTicketIdentity = createAction('[SdTicket] Select Ticket Identity', props<{ identity: number }>());

export const clearSelectedTicketIdentity = createAction('[SdTicket] Clear Selected Ticket Identity');

export const loadTicket = createAction('[SdTicket/API] Load Ticket');

export const loadTicketSuccess = createAction('[SdTicket/API] Load Ticket Success', props<{ ticket: SdTicket }>());

export const loadTicketFailure = createAction('[SdTicket/API] Load Ticket Failure', props<{ error: any }>());
