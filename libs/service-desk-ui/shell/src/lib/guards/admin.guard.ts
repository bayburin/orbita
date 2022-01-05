import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { UserPermission, UserPolicyService } from '@orbita/service-desk-ui/domain-logic';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanLoad {
  constructor(private userPolicy: UserPolicyService) {}

  canLoad(): boolean {
    return this.userPolicy.checkAccess(UserPermission.VIEW_ADMIN_PAGE);
  }
}
