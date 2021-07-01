import { BehaviorSubject } from 'rxjs';

import { ParameterFacadeAbstract } from './parameter.facade.abstract';

export class ParameterFacadeStub implements ParameterFacadeAbstract {
  loading$ = new BehaviorSubject(false);
  loaded$ = new BehaviorSubject(false);
  all$ = new BehaviorSubject([]);
}
