import { Directive, HostListener } from '@angular/core';

import { QuestionComponent } from './../../components/question/question.component';

@Directive({
  selector: '[libGetQuestionLink]',
})
export class GetQuestionLinkDirective {
  constructor(private component: QuestionComponent) {}

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.stopPropagation();
    const selBox = document.createElement('textarea');
    const question = this.component.questionOverview;

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `${location.origin}/categories/${question.ticket.service.category_id}/services/${question.ticket.service_id}?identity=${question.ticket.identity}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    // TODO: Уведомить о том, что ссылка скопирована
    // this.notifyService.setMessage('Ссылка на вопрос добавлена в буфер обмена');
  }
}
