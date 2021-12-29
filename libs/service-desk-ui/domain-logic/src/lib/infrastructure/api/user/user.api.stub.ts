import { of } from 'rxjs';

import { UserApiAbstract } from './user.api.abstract';

export class UserApiStub implements UserApiAbstract {
  api = '';

  loadNotifications() {
    return of([]);
  }

  loadNewNotifications() {
    return of(null);
  }

  loadUserOwns() {
    return of(null);
  }
}
