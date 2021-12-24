import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Attachment } from '../../../entities/models/attachment.interface';

export const setEntities = createAction('[Attachment] Set Entities', props<{ entities: Dictionary<Attachment> }>());

export const download = createAction('[Attachment] Download', props<{ attachment: Attachment }>());

export const downloadSuccess = createAction('[Attachment] Download Success', props<{ id: number }>());

export const downloadFailure = createAction('[Attachment] Download Failure', props<{ id: number }>());
