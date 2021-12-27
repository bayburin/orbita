import { BehaviorSubject } from 'rxjs';

export class RouterFacadeStub {
  breadcrumbMenu$ = new BehaviorSubject([]);
  needShowBreadcrumb$ = new BehaviorSubject(false);
}
