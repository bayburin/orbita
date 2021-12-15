import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import { ServicePolicyService, ServicePermission, ServiceVM } from '@orbita/service-desk-ui/domain-logic';

@Directive({
  selector: '[libServiceCheckAccess]',
})
export class ServiceCheckAccessDirective {
  @Input() libServiceCheckAccess: ServicePermission;
  @Input() set libServiceCheckAccessObject(object: ServiceVM) {
    this.viewContainerRef.clear();

    if (this.policy.checkAccess(this.libServiceCheckAccess, object)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private policy: ServicePolicyService
  ) {}
}
