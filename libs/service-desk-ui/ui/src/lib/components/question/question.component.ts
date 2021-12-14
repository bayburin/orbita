import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { QuestionOverviewVM, QuestionVM } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'lib-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent {
  /**
   * Режим, при котором ответ на вопрос не выдается, только вопрос с наименованием услуги и ссылка на него
   */
  @Input() standaloneLink = false;
  /**
   * Определяет, показывать ли системные флаги
   */
  @Input() showFlags: boolean;
  /**
   * Вопрос общего типа
   */
  @Input() data: QuestionOverviewVM | QuestionVM;
  /**
   * Вопрос с типом QuestionOverviewVM
   */
  get questionOverview(): QuestionOverviewVM {
    return this.data as QuestionOverviewVM;
  }
  /**
   * Вопрос с типом OverviewVM
   */
  get question(): QuestionVM {
    return this.data as QuestionVM;
  }
}
