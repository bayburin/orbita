import { createAction, props } from '@ngrx/store';

import { Message } from '../../../entities/models/message.interface';

export const setAll = createAction('[Message] Set All', props<{ messages: Message[] }>());

export const setMessages = createAction('[Message] Set Messages', props<{ messages: Message[] }>());

export const receiveComment = createAction('[Message] Receive Comment', props<{ message: Message }>());

export const clearAll = createAction('[Message] Clear All');

export const createComment = createAction(
  '[Message/API] Create Comment',
  props<{ ticketId: number; message: string }>()
);

export const createCommentSuccess = createAction('[Message/API] Create Comment Success');

export const createCommentFailure = createAction('[Message/API] Create Comment Failure', props<{ error: any }>());
