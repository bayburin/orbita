import { Component, OnInit, OnDestroy } from '@angular/core';
import { SdRequestFacade } from '@orbita/orbita-ui/domain-logic';
import { Subscription } from 'rxjs';

@Component({
  selector: 'orbita-ui-ticket-layout-page',
  templateUrl: './ticket-layout-page.component.html',
  styleUrls: ['./ticket-layout-page.component.scss'],
})
export class TicketLayoutPageComponent implements OnInit, OnDestroy {
  subscriptions = new Subscription();

  constructor(private sdRequestFacade: SdRequestFacade) {}

  ngOnInit(): void {
    this.subscriptions.add(this.sdRequestFacade.connectToSdRequestsUpdateChannel());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
