import { TicketFactoryT } from './ticket.factory.abstract';
import { Question } from '../../models/question/question.model';
import { TicketTypes } from '../../models/ticket/ticket.model';

export class QuestionFactory extends TicketFactoryT {
  create(params: any = {}): Question {
    return new Question(params);
  }
}
