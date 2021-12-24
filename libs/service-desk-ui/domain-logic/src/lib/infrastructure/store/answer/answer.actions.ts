import { Dictionary } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Answer } from '../../../entities/models/answer.interface';

export const setEntities = createAction('[Answer] Set Entities', props<{ entities: Dictionary<Answer> }>());
