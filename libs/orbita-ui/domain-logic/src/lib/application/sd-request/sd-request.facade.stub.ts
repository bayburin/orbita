import { BehaviorSubject, Subscription } from 'rxjs';

import { SdRequestFacadeAbstract } from './sd-request.facade.abstract';

export class SdRequestFacadeStub implements SdRequestFacadeAbstract {
  totalCount$ = new BehaviorSubject(0);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  all$ = new BehaviorSubject([]);
  error$ = new BehaviorSubject(null);
  selectedEntity$ = new BehaviorSubject(null);
  selectedSkeleton$ = new BehaviorSubject(null);
  selectedEditMode$ = new BehaviorSubject(null);
  selectedError$ = new BehaviorSubject(null);
  formEntity$ = new BehaviorSubject(null);
  formLoading$ = new BehaviorSubject(null);
  formNeedToGetNewData$ = new BehaviorSubject(null);
  newFormEntity$ = new BehaviorSubject(null);
  newFormLoading$ = new BehaviorSubject(null);
  newFormCreated$ = new BehaviorSubject(null);
  newFormShowModalAfterCreate$ = new BehaviorSubject(null);

  loadSdRequestsTable() {
    /** */
  }

  loadFiltered() {
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

  initNewForm() {
    /** */
  }

  changeNewForm() {
    /** */
  }

  createForm() {
    /** */
  }

  closeModalAfterCreateSdRequest() {
    /** */
  }

  clearCreatedForm() {
    /** */
  }

  connectToSdRequestsChannel() {
    return new Subscription();
  }

  reinitUpdateForm() {
    /** */
  }
}
