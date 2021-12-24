import { Injectable } from '@angular/core';
import { AuthHelper } from '@iss/ng-auth-center';

import { User } from '../../../entities/models/user.interface';
import {
  QuestionPermission,
  ServicePermission,
  ResponsibleUserPermission,
  policyPermissionTypes,
  policyObjectTypes,
} from '../../../entities/policies.interface';
import { QuestionVM } from '../../../entities/view-models/question-vm.interface';
import { QuestionOverviewVM } from '../../../entities/view-models/question-overview-vm.interface';
import { ServiceVM } from '../../../entities/view-models/service-vm.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicationPolicyService {
  /**
   * Пользователь, запрашивающий доступ (текущий пользователь)
   */
  user: User = this.authHelper.getJwtPayload();
  /**
   * Объект, к которому запрашивается доступ
   */
  protected _object: any;

  constructor(private authHelper: AuthHelper) {}

  /**
   * Проверяет доступ к объекту
   *
   * @param method - тип доступа
   * @param object - объект, к которому запрашивается доступ
   */

  checkAccess(method: QuestionPermission, object: QuestionVM | QuestionOverviewVM): boolean;
  checkAccess(method: ServicePermission, object: ServiceVM): boolean;
  checkAccess(method: ResponsibleUserPermission): boolean;
  checkAccess(method: policyPermissionTypes, object?: policyObjectTypes): boolean {
    if (!object) {
      this._object = object;
    }

    return (this as any)[method]();
  }
}
