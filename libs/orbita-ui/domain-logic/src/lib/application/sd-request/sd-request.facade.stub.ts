import { BehaviorSubject } from 'rxjs';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';

export class SdRequestFacadeStub implements SdRequestFacadeAbstract {
  firstRowIndex$ = new BehaviorSubject(0);
  totalCount$ = new BehaviorSubject(0);
  perPage$ = new BehaviorSubject(0);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  loadSdRequests$ = new BehaviorSubject(null);
  all$ = new BehaviorSubject([]);
  // loadSelected$ = new BehaviorSubject(null);
  selected$ = new BehaviorSubject(null);
  error$ = new BehaviorSubject(null);
  orderedHistories$ = new BehaviorSubject([]);
  sortField$ = new BehaviorSubject(null);
  sortOrder$ = new BehaviorSubject(null);
  form$ = new BehaviorSubject(null);

  setTableMetadata() {
    /** */
  }

  reloadTableData() {
    /** */
  }

  loadSelectedSdRequest() {
    /** */
  }

  clearSelected() {
    /** */
  }

  changeForm() {
    /** */
  }

  updateForm() {
    /** */
  }
}
