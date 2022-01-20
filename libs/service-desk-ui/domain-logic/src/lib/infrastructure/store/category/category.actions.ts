import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Category } from '../../../entities/models/category.interface';

export const setAll = createAction('[Category] Set All', props<{ categories: Category[] }>());

export const loadAll = createAction('[Category/API] Load All');

export const loadAllSuccess = createAction(
  '[Category/API] Load All Success',
  props<{ entities: Dictionary<Category>; ids: number[] }>()
);

export const loadAllFailure = createAction('[Category/API] Load All Failure', props<{ error: any }>());

export const loadSelected = createAction('[Category/API] Load Selected');

export const loadSelectedSuccess = createAction(
  '[Category/API] Load Selected Success',
  props<{ category: Category }>()
);

export const loadSelectedFailure = createAction('[Category/API] Load Selected Failure', props<{ error: any }>());

export const setEntities = createAction('[Category] Set Entities', props<{ entities: Dictionary<Category> }>());

export const setSelectedId = createAction('[Category] Set Selected Id', props<{ selectedId: number }>());

// ========== Администрирование ==========

export const adminLoadAll = createAction('[Category/API] Admin Load All');

export const adminLoadAllSuccess = createAction(
  '[Category/API] Admin Load All Success',
  props<{ categories: Category[] }>()
);

export const adminLoadAllFailure = createAction('[Category/API] Admin Load All Failure', props<{ error: any }>());

// ========== Форма рекомендаций для пользователя ==========

export const adminInitForm = createAction('[Category] Admin Init Form', props<{ category?: Category }>());

export const adminCloseForm = createAction('[Category] Admin Close Form');

export const adminChangeForm = createAction('[Category] Admin Change Form', props<{ formData: Category }>());

export const adminSaveForm = createAction('[Category/API] Admin Save Form');

export const adminSaveFormSuccess = createAction(
  '[Category/API] Admin Save Form Success',
  props<{ category: Category }>()
);

export const adminSaveFormFailure = createAction('[Category/API] Admin Save Form Failure', props<{ error: any }>());
