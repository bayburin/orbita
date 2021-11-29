import { TicketTypes } from '../../models/ticket/ticket.model';
import { Ticket } from '../ticket/ticket.model';

export class ClaimForm extends Ticket {
  readonly ticketType = TicketTypes.CLAIM_FORM;

  constructor(form: any = {}) {
    super(form);
    this.id = form.id;
  }

  getShowLink(): string {
    return 'Need implementation';
  }

  pageComponent(): string {
    return 'service-desk-ui-claim-form-page-content';
  }
}
