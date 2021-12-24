import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { QuestionFacadeAbstract } from './question.facade.abstract';
import { QuestionVM } from '../../entities/view-models/question-vm.interface';
import * as QuestionFeature from '../../infrastructure/store/question/question.reducer';
import * as QuestionSelectors from '../../infrastructure/store/question/question.selectors';
import * as QuestionActions from '../../infrastructure/store/question/question.actions';
import * as VMSelectors from '../../infrastructure/store/selectors/vm.selectors';

/**
 * Фасад для работы с вопросами
 */
@Injectable({
  providedIn: 'root',
})
export class QuestionFacade implements QuestionFacadeAbstract {
  constructor(private store: Store<QuestionFeature.QuestionPartialState>) {}

  upRating(question: QuestionVM) {
    this.store.dispatch(
      QuestionActions.upRating({ ticketId: question.ticket.id, serviceId: question.ticket.service_id })
    );
  }
}
