import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ServiceVM, Question } from '@orbita/service-desk-ui/domain-logic';
import { contentBlockAnimation } from '../../animations/content.animation';

@Component({
  selector: 'lib-home-question-faq',
  templateUrl: './home-question-faq.component.html',
  styleUrls: ['./home-question-faq.component.scss'],
  animations: [contentBlockAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeQuestionFaqComponent {
  @Input() services: ServiceVM[];
  limits = {
    services: 6,
    questions: 3,
  };

  trackByService(index: number, service: ServiceVM) {
    return service.id;
  }

  trackByQuestion(index: number, question: Question) {
    return question.ticket.identity;
  }
}
