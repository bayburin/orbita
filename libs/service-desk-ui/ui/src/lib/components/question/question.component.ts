import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { QuestionOverviewVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  /**
   * Вопрос
   */
  @Input() data: QuestionOverviewVM;
}
