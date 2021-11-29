import { TicketTypes } from '../../models/ticket/ticket.model';
import { TicketInitializer } from './ticket-initializer';
import { Question } from '../../models/question/question.model';
import { ClaimForm } from '../../models/claim-form/claim-form.model';

export class TicketFactory {
  static create(type: TicketTypes, params: any): Question;
  static create(type: TicketTypes, params: any): ClaimForm;
  static create(type: TicketTypes, params: any = {}): Question | ClaimForm {
    return TicketInitializer.for(type).create(params);
  }
}
