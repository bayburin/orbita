import { MessageFacadeAbstract } from './message.facade.abstract';
import { Message } from '../../entities/models/message.interface';

export class MessageFacadeStub implements MessageFacadeAbstract {
  replaceAllMessages(messages: Message[]) {
    /** */
  }

  setMessages(messages: Message[]) {
    /** */
  }
}
