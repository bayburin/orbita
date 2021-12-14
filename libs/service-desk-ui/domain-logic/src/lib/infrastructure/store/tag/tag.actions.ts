import { Dictionary } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Tag } from './../../../entities/model/tag.interface';

export const setEntities = createAction('[Service] Set Entities', props<{ entities: Dictionary<Tag> }>());
