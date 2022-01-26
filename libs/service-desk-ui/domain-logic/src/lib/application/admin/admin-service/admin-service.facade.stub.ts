import { BehaviorSubject } from 'rxjs';

import { AdminServiceFacadeAbstract } from './admin-service.facade.abstract';

export class AdminServiceFacadeStub implements AdminServiceFacadeAbstract {
  all$ = new BehaviorSubject([]);
  selected$ = new BehaviorSubject(null);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  loadingIds$ = new BehaviorSubject([]);
  formData$ = new BehaviorSubject(null);
  formLoading$ = new BehaviorSubject(false);
  formDisplay$ = new BehaviorSubject(false);
  formError$ = new BehaviorSubject(null);

  loadAll() {
    /** */
  }

  edit() {
    /** */
  }

  show() {
    /** */
  }

  initForm() {
    /** */
  }

  closeForm() {
    /** */
  }

  changeForm() {
    /** */
  }

  saveForm() {
    /** */
  }

  destroy() {
    /** */
  }
}
