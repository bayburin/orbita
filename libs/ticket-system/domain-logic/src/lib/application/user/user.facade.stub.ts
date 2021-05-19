import { BehaviorSubject } from "rxjs";

export class UserFacadeStub {
  loaded$ = new BehaviorSubject(false);
  all$ = new BehaviorSubject([]);
  init() {}
}
