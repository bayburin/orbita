import { of } from 'rxjs';

import { CategoryApiAbstract } from './category.api.abstract';

export class CategoryApiStub implements CategoryApiAbstract {
  api = '';

  query() {
    return of([]);
  }

  show() {
    return of(null);
  }
}
