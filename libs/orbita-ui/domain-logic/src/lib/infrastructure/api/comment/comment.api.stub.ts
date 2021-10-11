import { of } from 'rxjs';

import { CommentApiAbstract } from './comment.api.abstract';

export class CommentApiStub implements CommentApiAbstract {
  api = '';

  create() {
    return of({ message: 'ok' });
  }
}
