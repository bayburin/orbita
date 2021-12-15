import { Injectable } from '@angular/core';

import { isUserHasRole } from '../../utils/is-user-has-role.function';
import { ApplicationPolicyService } from '../application/application-policy.service';

@Injectable({
  providedIn: 'root',
})
export class ResponsibleUserPolicyService extends ApplicationPolicyService {
  view(): boolean {
    return isUserHasRole(this.user, ['content_manager', 'operator', 'service_responsible']);
  }
}
