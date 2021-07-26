import { createAction, props } from '@ngrx/store';

import { Message } from '../../../entities/models/message.interface';

export const setAll = createAction('[Message] Set All', props<{ messages: Message[] }>());

export const setMessages = createAction('[Message] Set Messages', props<{ messages: Message[] }>());

export const clearAll = createAction('[Message] Clear All');
