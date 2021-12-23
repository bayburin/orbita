import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Attachment } from '../../../entities/model/attachment.interface';

export const setEntities = createAction('[Attachment] Set Entities', props<{ entities: Dictionary<Attachment> }>());
