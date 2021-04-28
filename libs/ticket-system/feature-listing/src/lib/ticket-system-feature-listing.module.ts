import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SdRequestsTableComponent } from './sd-requests-table/sd-requests-table.component';
import { TicketSystemDomainLogicModule } from '@orbita/ticket-system/domain-logic';

@NgModule({
  imports: [
    CommonModule,
    TicketSystemDomainLogicModule
  ],
  declarations: [SdRequestsTableComponent],
  exports: [SdRequestsTableComponent]
})
export class TicketSystemFeatureListingModule {}
