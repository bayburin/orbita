import { of, Observable } from 'rxjs';

import { ParameterServerData } from './../../../entities/server-data/parameter-server-data.interface';
import { ParameterApiAbstract } from './parameter.api.abstract';

export class ParameterApiStub implements ParameterApiAbstract {
  api = '';

  query(claim_id: number): Observable<ParameterServerData> { return of({ parameters: [] }); }
}
