import { BehaviorSubject } from 'rxjs';

import { AdminCategoryFacadeAbstract } from './admin-category.facade.abstract';

export class AdminCategoryFacadeStub implements AdminCategoryFacadeAbstract {
  all$ = new BehaviorSubject([]);
  selected$ = new BehaviorSubject(null);
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  formData$ = new BehaviorSubject(null);
  formLoading$ = new BehaviorSubject(false);
  formDisplay$ = new BehaviorSubject(false);
  formError$ = new BehaviorSubject(null);

  loadAll() {
    /** */
  }

  loadSelected() {
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
}
