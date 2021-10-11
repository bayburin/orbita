import { Subscription } from 'rxjs';

import { MessageFacadeAbstract } from './message.facade.abstract';

export class MessageFacadeStub implements MessageFacadeAbstract {
  createComment() {
    /** */
  }

  connectToCommentsChannel() {
    return new Subscription();
  }
}
