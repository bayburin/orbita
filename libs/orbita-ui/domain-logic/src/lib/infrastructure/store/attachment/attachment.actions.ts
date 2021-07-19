import { createAction, props } from '@ngrx/store';

import { Attachment } from './../../../entities/models/attachment.interface';

export const setAll = createAction('[Attachment] Set All', props<{ attachments: Attachment[] }>());

export const setAttachments = createAction('[Work] Set Attachments', props<{ attachments: Attachment[] }>());
