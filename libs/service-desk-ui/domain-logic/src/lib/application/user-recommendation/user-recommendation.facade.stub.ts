import { BehaviorSubject } from 'rxjs';

import { UserRecommendationFacadeAbstract } from './user-recommendation.facade.abstract';

export class UserRecommendationFacadeStub implements UserRecommendationFacadeAbstract {
  all$ = new BehaviorSubject([]);
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

  reorder() {
    /** */
  }
}
