import { createAction, props } from '@ngrx/store';

import { Category } from './../../../entities/model/category.interface';
import { ResponsibleUser } from '../../../entities/model/responsible-user.interface';
import { Question } from './../../../entities/model/question.interface';
import { Service } from './../../../entities/model/service.interface';

export const search = createAction('[Search/API] Search', props<{ term: string }>());

export const searchSuccess = createAction(
  '[Search/API] Search Success',
  props<{ categoryIds: number[]; serviceIds: number[]; questionIds: number[]; responsibleUserIds: number[] }>()
);

export const searchFailure = createAction('[Search/API] Search Failure', props<{ error: any }>());

export const setAll = createAction(
  '[Search] Set All',
  props<{ categories: Category[]; services: Service[]; questions: Question[]; responsibleUsers: ResponsibleUser[] }>()
);

export const removeAll = createAction('[Search] Remove All');
