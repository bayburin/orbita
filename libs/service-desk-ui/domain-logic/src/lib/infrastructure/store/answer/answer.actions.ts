import { Dictionary } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { Answer } from '../../../entities/model/answer.interface';

export const setEntities = createAction('[Service] Set Entities', props<{ entities: Dictionary<Answer> }>());
