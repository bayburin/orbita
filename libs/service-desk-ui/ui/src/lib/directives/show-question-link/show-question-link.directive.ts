import { Directive, HostListener } from '@angular/core';

import { QuestionComponent } from './../../components/question/question.component';

@Directive({
  selector: '[libShowQuestionLink]',
})
export class ShowQuestionLinkDirective {
  constructor(private component: QuestionComponent) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.component.linkAnimation = 'show';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.component.linkAnimation = 'hide';
  }
}
