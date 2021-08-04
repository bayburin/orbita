import { BehaviorSubject } from 'rxjs';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';

export class SdRequestFacadeStub implements SdRequestFacadeAbstract {
  firstRowIndex$ = new BehaviorSubject(0);
  totalCount$ = new BehaviorSubject(0);
  perPage$ = new BehaviorSubject(0);
  sortField$ = new BehaviorSubject(null);
  sortOrder$ = new BehaviorSubject(null);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  loadSdRequests$ = new BehaviorSubject(null);
  all$ = new BehaviorSubject([]);
  error$ = new BehaviorSubject(null);
  selectedEntity$ = new BehaviorSubject(null);
  selectedSkeleton$ = new BehaviorSubject(null);
  selectedEditMode$ = new BehaviorSubject(null);
  selectedError$ = new BehaviorSubject(null);
  formEntity$ = new BehaviorSubject(null);
  formLoading$ = new BehaviorSubject(null);

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

  toggleEditMode() {
    /** */
  }

  changeForm() {
    /** */
  }

  updateForm() {
    /** */
  }

  clearAll() {
    /** */
  }

  changeNewForm() {
    /** */
  }
}
