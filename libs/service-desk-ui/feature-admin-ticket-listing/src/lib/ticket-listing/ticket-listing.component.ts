import { Component, OnInit } from '@angular/core';
import { AdminServiceFacade } from '@orbita/service-desk-ui/domain-logic';

@Component({
  selector: 'service-desk-ui-admin-ticket-listing-ticket-listing',
  templateUrl: './ticket-listing.component.html',
  styleUrls: ['./ticket-listing.component.scss'],
})
export class TicketListingComponent implements OnInit {
  loading$ = this.adminServiceFacade.loading$;
  loaded$ = this.adminServiceFacade.loaded$;

  constructor(private adminServiceFacade: AdminServiceFacade) {}

  ngOnInit(): void {
    this.adminServiceFacade.show();
  }
}
