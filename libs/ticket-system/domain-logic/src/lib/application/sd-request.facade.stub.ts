import { BehaviorSubject } from "rxjs";

export class SdRequestFacadeStub {
  loaded$ = new BehaviorSubject(false);
  all$ = new BehaviorSubject([]);
  selected$ = new BehaviorSubject(null);

  loadAll() { console.log('load all data'); }
}
