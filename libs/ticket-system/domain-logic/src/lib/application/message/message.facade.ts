import { Injectable } from "@angular/core";
import { Store } from '@ngrx/store';

import * as MessageFeature from '../../infrastructure/store/message/message.reducer';
import * as MessageActions from '../../infrastructure/store/message/message.actions';
import { Message } from '../../entities/models/message.interface';
import { MessageFacadeAbstract } from "./message.facade.abstract";

/**
 * Фасад для работы с сообщениями (обращения к стору Message)
 */
@Injectable({
  providedIn: 'root'
})
export class MessageFacade implements MessageFacadeAbstract {
  constructor(private store: Store<MessageFeature.MessagePartialState>) {}

  setMessages(messages: Message[]) {
    this.store.dispatch(MessageActions.setAll({ messages }));
  }
}
