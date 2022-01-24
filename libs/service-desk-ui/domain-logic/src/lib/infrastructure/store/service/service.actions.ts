import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Service } from '../../../entities/models/service.interface';

export const setEntities = createAction('[Service] Set Entities', props<{ entities: Dictionary<Service> }>());

export const loadSelected = createAction('[Service/API] Load Selected');

export const loadSelectedSuccess = createAction('[Service/API] Load Selected Success', props<{ service: Service }>());

export const loadSelectedFailure = createAction('[Service/API] Load Selected Failure', props<{ error: string }>());

export const setAll = createAction('[Service] Set All', props<{ services: Service[] }>());

// ========== Администрирование ==========

export const adminLoadAll = createAction('[Service/API] Admin Load All');

export const adminLoadAllSuccess = createAction(
  '[Service/API] Admin Load All Success',
  props<{ entities: Dictionary<Service>; ids: number[] }>()
);

export const adminLoadAllFailure = createAction('[Service/API] Admin Load All Failure', props<{ error: any }>());

export const adminDestroyWithDestroyedCategory = createAction(
  '[Service] Admin Destroy With Destroyed Category',
  props<{ categoryId: number }>()
);

// ========== Форма рекомендаций для пользователя ==========

export const adminInitForm = createAction('[Service] Admin Init Form', props<{ service?: Service }>());

export const adminCloseForm = createAction('[Service] Admin Close Form');

export const adminChangeForm = createAction('[Service] Admin Change Form', props<{ formData: Service }>());

export const adminSaveForm = createAction('[Service/API] Admin Save Form');

export const adminSaveFormSuccess = createAction(
  '[Service/API] Admin Save Form Success',
  props<{ service: Service }>()
);

export const adminSaveFormFailure = createAction('[Service/API] Admin Save Form Failure', props<{ error: any }>());
