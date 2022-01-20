import { of } from 'rxjs';

import { AdminCategoryApiAbstract } from './admin-category.api.abstract';

export class AdminCategoryApiStub implements AdminCategoryApiAbstract {
  api = '';

  query() {
    return of([]);
  }

  show() {
    return of(null);
  }

  save() {
    return of(null);
  }
}
