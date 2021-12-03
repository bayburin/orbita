import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Question } from '../../../entities/model/question.interface';

export const setEntities = createAction('[Question] Set Entities', props<{ entities: Dictionary<Question> }>());
