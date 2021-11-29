import { Component, Input } from '@angular/core';

import { Ticket } from '../../models/ticket/ticket.model';

@Component({
  selector: 'service-desk-ui-claim-form-page-content',
  templateUrl: './claim-form-page-content.component.html',
  styleUrls: ['./claim-form-page-content.component.scss'],
})
export class ClaimFormPageContentComponent {
  @Input() data: Ticket;

  generateLink(): string {
    return this.data.getShowLink();
  }
}
