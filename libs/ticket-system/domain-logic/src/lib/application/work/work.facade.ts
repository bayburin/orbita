import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';

import * as WorkFeature from '../../infrastructure/store/work/work.reducer';
import * as WorkActions from '../../infrastructure/store/work/work.actions';
import { Work } from '../../entities/models/work.interface';
// import { WorkFacadeAbstract } from "./work.facade.abstract";

/**
 * Фасад для работы с сообщениями (обращения к стору Work)
 */
@Injectable({
  providedIn: 'root'
})
export class WorkFacade {
  constructor(private store: Store<WorkFeature.WorkPartialState>) {}

  setWorks(works: Work[]) {
    this.store.dispatch(WorkActions.setAll({ works }));
  }
}
