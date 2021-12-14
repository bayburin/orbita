import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { QuestionOverviewVM, QuestionVM } from '@orbita/service-desk-ui/domain-logic';
import { AbstractSearchResultComponent } from './../abstract-search-result/abstract-search-result.component';

@Component({
  selector: 'lib-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionComponent extends AbstractSearchResultComponent<QuestionOverviewVM | QuestionVM> {
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
