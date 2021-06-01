import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as WorkerFeature from '../../infrastructure/store/worker/worker.reducer';
import * as WorkerActions from '../../infrastructure/store/worker/worker.actions';
import { Worker } from '../../entities/models/worker.interface';
import { WorkerFacadeAbstract } from './worker.facade.abstract';

/**
 * Фасад для работы с исполнителями заявки (обращения к хранилищу Worker)
 */
@Injectable({
  providedIn: 'root',
})
export class WorkerFacade implements WorkerFacadeAbstract {
  constructor(private store: Store<WorkerFeature.WorkerPartialState>) {}

  setWorkers(workers: Worker[]) {
    this.store.dispatch(WorkerActions.setAll({ workers }));
  }
}
