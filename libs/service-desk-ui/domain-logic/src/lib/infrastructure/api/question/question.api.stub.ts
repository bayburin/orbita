import { of } from 'rxjs';

import { QuestionApiAbstract } from './question.api.abstract';

export class QuestionApiStub implements QuestionApiAbstract {
  api = '';

  upRating() {
    return of(null);
  }
}
