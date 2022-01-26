import { createAction, props } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity';

import { Service } from '../../../entities/models/service.interface';
import { ServiceForm } from '../../../entities/form/service-form.interface';
import { ServiceOverviewVM } from '../../../entities/view-models/service-overview-vm.interface';

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

export const adminSelect = createAction('[Service] Admin Select', props<{ id: number; edit?: boolean }>());

export const adminLoadSelectedOnEdit = createAction('[Service/API] Admin Load Selected On Edit');

export const adminLoadSelectedOnEditSuccess = createAction(
  '[Service/API] Admin Load Selected On Edit Success',
  props<{ service: Service }>()
);

export const adminLoadSelectedOnEditFailure = createAction(
  '[Service/API] Admin Load Selected On Edit Failure',
  props<{ error: any }>()
);

export const adminLoadSelectedOnShow = createAction('[Service/API] Admin Load Selected On Show');

export const adminLoadSelectedOnShowSuccess = createAction(
  '[Service/API] Admin Load Selected On Show Success',
  props<{ service: Service }>()
);

export const adminLoadSelectedOnShowFailure = createAction(
  '[Service/API] Admin Load Selected On Show Failure',
  props<{ error: any }>()
);

export const adminDestroyWithDestroyedCategory = createAction(
  '[Service] Admin Destroy With Destroyed Category',
  props<{ categoryId: number }>()
);

export const adminDestroy = createAction('[Service/API] Admin Destroy', props<{ id: number }>());

export const adminDestroySuccess = createAction('[Service/API] Admin Destroy Success', props<{ id: number }>());

export const adminDestroyFailure = createAction('[Service/API] Admin Destroy Failure', props<{ id: number }>());

// ========== Форма рекомендаций для пользователя ==========

export const adminInitForm = createAction('[Service] Admin Init Form', props<{ service?: ServiceOverviewVM }>());

export const adminCloseForm = createAction('[Service] Admin Close Form');

export const adminChangeForm = createAction('[Service] Admin Change Form', props<{ formData: ServiceForm }>());

export const adminSaveForm = createAction('[Service/API] Admin Save Form');

export const adminSaveFormSuccess = createAction(
  '[Service/API] Admin Save Form Success',
  props<{ service: Service }>()
);

export const adminSaveFormFailure = createAction('[Service/API] Admin Save Form Failure', props<{ error: any }>());
