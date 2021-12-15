import { Injectable } from '@angular/core';

import { ServiceVM } from './../../../entities/view-models/service-vm.interface';
import { isUserHasRole } from '../../utils/is-user-has-role.function';
import { isServiceBelongsByTicketToUser, isServiceBelongsToUser } from '../../utils/service.functions';
import { ApplicationPolicyService } from './../application/application-policy.service';

@Injectable({
  providedIn: 'root',
})
export class ServicePolicyService extends ApplicationPolicyService {
  get service(): ServiceVM {
    return this._object as ServiceVM;
  }

  viewManageInfo(): boolean {
    if (isUserHasRole(this.user, 'service_responsible')) {
      return isServiceBelongsToUser(this.service, this.user) || isServiceBelongsByTicketToUser(this.service, this.user);
    } else {
      return isUserHasRole(this.user, 'content_manager') || isUserHasRole(this.user, 'operator');
    }
  }

  manage(): boolean {
    if (isUserHasRole(this.user, 'service_responsible')) {
      return isServiceBelongsToUser(this.service, this.user) || isServiceBelongsByTicketToUser(this.service, this.user);
    } else {
      return isUserHasRole(this.user, 'content_manager');
    }
  }
}
