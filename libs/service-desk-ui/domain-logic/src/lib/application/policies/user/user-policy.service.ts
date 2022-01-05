import { Injectable } from '@angular/core';

import { isUserHasRole } from '../../../infrastructure/utils/is-user-has-role.function';
import { ApplicationPolicyService } from '../application/application-policy.service';

@Injectable({
  providedIn: 'root',
})
export class UserPolicyService extends ApplicationPolicyService {
  viewAdminPage(): boolean {
    return isUserHasRole(this.user, ['content_manager', 'service_responsible']);
  }

  viewResponsibleUsers(): boolean {
    return isUserHasRole(this.user, ['content_manager', 'operator', 'service_responsible']);
  }
}
