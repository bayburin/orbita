import { of, Observable } from 'rxjs';

import { Init } from './../../../entities/server-data/init.interface';
import { AppApiAbstract } from './app.api.abstract';

export class AppApiStub implements AppApiAbstract {
  api = '';

  init(): Observable<Init> { return of({} as Init); }
}
