import { ChangeDetectionStrategy, Component, Input, ViewChildren, QueryList } from '@angular/core';

import { QuestionComponent } from '@orbita/service-desk-ui/ui';
import { QuestionVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionListComponent {
  /**
   * Список вопросов
   */
  @Input() questions: QuestionVM[];
  @ViewChildren(QuestionComponent) questionComponents: QueryList<QuestionComponent>;

  trackByQuestion(index: number, question: QuestionVM) {
    return question.id;
  }
}
