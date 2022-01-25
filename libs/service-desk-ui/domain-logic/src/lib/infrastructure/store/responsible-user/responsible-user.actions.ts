import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { ResponsibleUser } from '../../../entities/models/responsible-user.interface';

export const setEntities = createAction(
  '[ResponsibleUser] Set Entities',
  props<{ entities: Dictionary<ResponsibleUser> }>()
);

export const setMany = createAction('[ResponsibleUser] Set Many', props<{ responsibleUsers: ResponsibleUser[] }>());
