import { Directive, HostListener } from '@angular/core';
import { NotificationFacade } from '@orbita/service-desk-ui/domain-logic';

import { QuestionComponent } from './../../components/question/question.component';

@Directive({
  selector: '[libGetQuestionLink]',
})
export class GetQuestionLinkDirective {
  constructor(private component: QuestionComponent, private notificationFacade: NotificationFacade) {}

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    const selBox = document.createElement('textarea');
    const question = this.component.data;

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${location.origin}/tickets/${question.ticket.identity}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.notificationFacade.showMessage('Ссылка на вопрос добавлена в буфер обмена');
  }
}
