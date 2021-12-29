import { BehaviorSubject } from 'rxjs';

import { KaseFacadeAbstract } from './kase.facade.abstract';

export class KaseFacadeStub implements KaseFacadeAbstract {
  // ========== Список заявок ==========

  all$ = new BehaviorSubject([]);
  initLoading$ = new BehaviorSubject(false);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  statuses$ = new BehaviorSubject([]);
  selectedStatusId$ = new BehaviorSubject(null);
  isAnyKase$ = new BehaviorSubject(false);

  // ========== Форма новой заявки ==========

  formEntity$ = new BehaviorSubject(null);
  formSvtItems$ = new BehaviorSubject([]);
  formLoadingParams$ = new BehaviorSubject(false);
  formErrorParams$ = new BehaviorSubject(null);

  init() {
    /** */
  }

  revoke() {
    /** */
  }

  vote() {
    /** */
  }

  setSelectedStatusId() {
    /** */
  }

  clearSelectedServices() {
    /** */
  }

  initNewForm() {
    /** */
  }

  changeForm() {
    /** */
  }

  saveForm() {
    /** */
  }
}
