import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { UserPolicyService, UserPermission } from '@orbita/service-desk-ui/domain-logic';

@Directive({
  selector: '[libUserCheckAccess]',
})
export class UserCheckAccessDirective {
  @Input() set libUserCheckAccess(permission: UserPermission) {
    this.viewContainerRef.clear();

    if (this.policy.checkAccess(permission)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private policy: UserPolicyService
  ) {}
}
