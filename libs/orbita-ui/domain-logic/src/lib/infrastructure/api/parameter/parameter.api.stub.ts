import { of } from 'rxjs';

import { ParameterApiAbstract } from './parameter.api.abstract';

export class ParameterApiStub implements ParameterApiAbstract {
  api = '';

  query() {
    return of({ parameters: [] });
  }
}
