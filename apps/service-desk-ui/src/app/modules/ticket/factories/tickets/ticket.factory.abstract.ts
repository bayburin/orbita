import { Question } from '../../models/question/question.model';
import { ClaimForm } from '../../models/claim-form/claim-form.model';

export abstract class TicketFactoryT {
  abstract create(params: any): Question | ClaimForm;
}
