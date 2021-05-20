import { of, Observable } from 'rxjs';

import { Init } from './../../../entities/server-data/init.interface';

export class OrbitaApiStub {
  query(): Observable<Init> { return of({} as Init); }
}
