import { of, Observable } from 'rxjs';

import { InitServerData } from './../../../entities/server-data/init.interface';
import { AppApiAbstract } from './app.api.abstract';

export class AppApiStub implements AppApiAbstract {
  api = '';

  init(): Observable<InitServerData> {
    return of({} as InitServerData);
  }
}
