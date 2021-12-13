import { Injectable } from '@angular/core';

import { isUserHasRole } from '../../utils/is-user-has-role.function';
import { ApplicationPolicy } from '../application/application.policy';

@Injectable({
  providedIn: 'root',
})
export class UserPolicy extends ApplicationPolicy {
  responsibleUserAccess(): boolean {
    return isUserHasRole(this.user, ['content_manager', 'operator', 'service_responsible']);
  }
}
