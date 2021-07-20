import { createAction, props } from '@ngrx/store';

import { Attachment } from './../../../entities/models/attachment.interface';

export const setAll = createAction('[Attachment] Set All', props<{ attachments: Attachment[] }>());

export const setAttachments = createAction('[Attachment] Set Attachments', props<{ attachments: Attachment[] }>());

export const download = createAction('[Attachment] Download', props<{ attachment: Attachment }>());

export const downloadSuccess = createAction('[Attachment] Download Success', props<{ id: number }>());

export const downloadFailure = createAction('[Attachment] Download Failure', props<{ id: number }>());
