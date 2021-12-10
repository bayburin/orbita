import { BehaviorSubject } from 'rxjs';

import { HomeFacadeAbstract } from './home.facade.abstract';

export class HomeFacadeStub implements HomeFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  categories$ = new BehaviorSubject([]);
  services$ = new BehaviorSubject([]);

  loadHome() {
    /** */
  }
}
