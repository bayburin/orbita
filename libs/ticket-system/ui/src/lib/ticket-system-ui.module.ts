import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const ngbModules: any[] = [
  NgbPaginationModule
];

@NgModule({
  imports: [
    CommonModule,
    ...ngbModules
  ],
  exports: [...ngbModules]
})
export class TicketSystemUiModule {}
