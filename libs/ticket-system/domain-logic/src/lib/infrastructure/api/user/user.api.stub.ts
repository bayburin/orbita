import { of, Observable } from 'rxjs';

import { User } from '../../../entities/user.interface';

export class UserApiStub {
  query(): Observable<User[]> { return of([]); }
}
