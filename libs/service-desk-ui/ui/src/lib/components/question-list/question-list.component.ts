import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { QuestionVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionListComponent {
  @Input() questions: QuestionVM[];

  trackByQuestion(index: number, question: QuestionVM) {
    return question.id;
  }
}
