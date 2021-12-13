import { Injectable } from '@angular/core';

import { isUserHasRole } from '../../utils/is-user-has-role.function';
import { isServiceBelongsByTicketToUser, isServiceBelongsToUser } from '../../utils/service.functions';
import { ApplicationPolicy } from '../application/application.policy';

@Injectable({
  providedIn: 'root',
})
export class ServicePolicy extends ApplicationPolicy {
  newTicket(): boolean {
    if (isUserHasRole(this.user, 'service_responsible')) {
      return isServiceBelongsToUser(this.object, this.user) || isServiceBelongsByTicketToUser(this.object, this.user);
    } else {
      return isUserHasRole(this.user, 'content_manager');
    }
  }

  showFlags(): boolean {
    if (isUserHasRole(this.user, 'service_responsible')) {
      return isServiceBelongsToUser(this.object, this.user) || isServiceBelongsByTicketToUser(this.object, this.user);
    } else {
      return isUserHasRole(this.user, 'content_manager') || isUserHasRole(this.user, 'operator');
    }
  }
}
