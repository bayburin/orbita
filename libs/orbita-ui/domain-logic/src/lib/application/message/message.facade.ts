import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import * as MessageFeature from '../../infrastructure/store/message/message.reducer';
import * as MessageActions from '../../infrastructure/store/message/message.actions';
import { MessageFacadeAbstract } from './message.facade.abstract';
import { StreamService } from '../../infrastructure/stream/stream.service';

/**
 * Фасад для работы с сообщениями (обращения к хранилищу Message)
 */
@Injectable({
  providedIn: 'root',
})
export class MessageFacade implements MessageFacadeAbstract {
  constructor(private store: Store<MessageFeature.MessagePartialState>, private streamService: StreamService) {}

  createComment(ticketId: number, message: string): void {
    this.store.dispatch(MessageActions.createComment({ ticketId, message }));
  }

  connectToCommentsChannel(ticketId: number): Subscription {
    const channel = this.streamService.cable.channel('CommentsChannel', { claim_id: ticketId });

    return channel.received().subscribe((message) => {
      this.store.dispatch(MessageActions.receiveComment({ message }));
    });
  }
}
