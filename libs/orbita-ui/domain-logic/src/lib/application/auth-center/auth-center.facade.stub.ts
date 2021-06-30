import { BehaviorSubject } from 'rxjs';

import { AuthCenterFacadeAbstract } from './auth-center.facade.abstract';

export class AuthCenterFacadeStub implements AuthCenterFacadeAbstract {
  loadingHost$ = new BehaviorSubject(false);
  loadedHost$ = new BehaviorSubject(false);
  selectedHost$ = new BehaviorSubject(null);
}
