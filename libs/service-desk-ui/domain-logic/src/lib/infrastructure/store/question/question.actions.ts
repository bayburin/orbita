import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Question } from '../../../entities/models/question.interface';

export const setEntities = createAction('[Question] Set Entities', props<{ entities: Dictionary<Question> }>());

export const upRating = createAction('[Question/API] Up Rating', props<{ ticketId: number; serviceId: number }>());
