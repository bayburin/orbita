import { TicketFactoryT } from './ticket.factory.abstract';
import { ClaimForm } from '../../models/claim-form/claim-form.model';

export class ClaimFormFactory extends TicketFactoryT {
  create(params: any = {}): ClaimForm {
    return new ClaimForm(params);
  }
}
