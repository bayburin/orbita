import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

import { PolicyFactory } from '../../factories/policy.factory';

@Directive({
  selector: '[libAuthorize]',
})
export class AuthorizeDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private policyFactory: PolicyFactory
  ) {}

  /**
   * @param policyData - кортеж ['объект, к которому проверяется доступ', 'имя метода, проверяющего доступ']
   */
  @Input() set libAuthorize(policyData: [any, string]) {
    const policy = this.policyFactory.getPolicyBy(policyData[0]);

    this.viewContainerRef.clear();
    if (policy.authorize(policyData[0], policyData[1])) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }
}
