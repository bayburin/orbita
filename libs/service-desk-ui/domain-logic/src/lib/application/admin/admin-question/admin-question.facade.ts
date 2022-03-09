import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AdminQuestionFacadeAbstract } from './admin-question.facade.abstract';
import * as QuestionFeature from '../../../infrastructure/store/question/question.reducer';
import * as QuestionSelectors from '../../../infrastructure/store/question/question.selectors';
import * as QuestionActions from '../../../infrastructure/store/question/question.actions';

@Injectable({
  providedIn: 'root',
})
export class AdminQuestionFacade implements AdminQuestionFacadeAbstract {
  constructor(private store: Store<QuestionFeature.QuestionPartialState>) {}

  publish(id: number) {
    console.log('publish ', id);
  }

  destroyPublished(id: number) {
    console.log('destroy published ', id);
  }

  destroyDraft(id: number) {
    console.log('destroy draft ', id);
  }
}
