import { of, Observable } from 'rxjs';

import { FreeSdRequestType } from '../../../entities/free-sd-request-type.interface';

export class ServiceDeskApiStub {
  getFreeSdRequestTypes(): Observable<FreeSdRequestType[]> { return of([]); }
}
