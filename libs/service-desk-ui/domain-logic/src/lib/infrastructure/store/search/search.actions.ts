import { createAction, props } from '@ngrx/store';

import { Category } from '../../../entities/models/category.interface';
import { ResponsibleUser } from '../../../entities/models/responsible-user.interface';
import { Question } from '../../../entities/models/question.interface';
import { Service } from '../../../entities/models/service.interface';

export const search = createAction('[Search/API] Search', props<{ term: string }>());

export const searchSuccess = createAction(
  '[Search/API] Search Success',
  props<{ categoryIds: number[]; serviceIds: number[]; questionIds: number[] }>()
);

export const searchFailure = createAction('[Search/API] Search Failure', props<{ error: any }>());

export const setAll = createAction(
  '[Search] Set All',
  props<{ categories: Category[]; services: Service[]; questions: Question[]; responsibleUsers: ResponsibleUser[] }>()
);

export const removeAll = createAction('[Search] Remove All');
