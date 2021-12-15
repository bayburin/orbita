import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

import {
  QuestionPolicyService,
  QuestionPermission,
  QuestionOverviewVM,
  QuestionVM,
} from '@orbita/service-desk-ui/domain-logic';

@Directive({
  selector: '[libQuestionCheckAccess]',
})
export class QuestionCheckAccessDirective {
  @Input() libQuestionCheckAccess: QuestionPermission;
  @Input() set libQuestionCheckAccessObject(object: QuestionOverviewVM | QuestionVM) {
    this.viewContainerRef.clear();

    if (this.policy.checkAccess(this.libQuestionCheckAccess, object)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private policy: QuestionPolicyService
  ) {}
}
