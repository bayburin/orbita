import { createAction, props } from '@ngrx/store';

import { SdService } from './../../../entities/models/sd/sd-service.interface';

export const setAll = createAction('[SdService] Set All', props<{ services: SdService[] }>());

export const setOne = createAction('[SdService] Set One', props<{ service: SdService }>());
