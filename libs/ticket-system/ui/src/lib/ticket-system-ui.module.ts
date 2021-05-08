import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { MaterialModule } from './material.module';

const ngbModules: any[] = [
  NgbPaginationModule
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ...ngbModules,
  ],
  exports: [
    MaterialModule,
    ...ngbModules
  ]
})
export class TicketSystemUiModule {}
