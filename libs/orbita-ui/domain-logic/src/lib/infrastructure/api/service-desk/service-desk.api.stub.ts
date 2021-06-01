import { of, Observable } from 'rxjs';

import { FreeSdRequestType } from '../../../entities/models/sd/free-sd-request-type.interface';
import { ServiceDeskApiAbstract } from './service-desk.api.abstract';

export class ServiceDeskApiStub implements ServiceDeskApiAbstract {
  api = '';

  getFreeSdRequestTypes(): Observable<FreeSdRequestType[]> {
    return of([]);
  }
}
