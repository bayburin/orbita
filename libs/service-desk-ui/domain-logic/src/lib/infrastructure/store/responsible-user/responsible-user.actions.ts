import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { ResponsibleUser } from '../../../entities/model/responsible-user.interface';

export const setEntities = createAction(
  '[ResponsibleUser] Set Entities',
  props<{ entities: Dictionary<ResponsibleUser> }>()
);
