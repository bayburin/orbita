import { ChangeDetectionStrategy, Component } from '@angular/core';

import { QuestionOverviewVM, QuestionPermission } from '@orbita/service-desk-ui/domain-logic';
import { AbstractSearchResultComponent } from '../abstract-search-result/abstract-search-result.component';

@Component({
  selector: 'lib-search-result-question',
  templateUrl: './search-result-question.component.html',
  styleUrls: ['./search-result-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultQuestionComponent extends AbstractSearchResultComponent<QuestionOverviewVM> {
  permission = QuestionPermission;
}
