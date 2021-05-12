import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CdkTableModule } from '@angular/cdk/table';
import { DatetimePipe } from './pipes/datetime.pipe';

const ngbModules: any[] = [
  NgbPaginationModule
];

const materialModules: any[] = [
  CdkTableModule
]

const pipes: any[] = [
  DatetimePipe
]

@NgModule({
  imports: [
    CommonModule,
    ...ngbModules,
    ...materialModules
  ],
  exports: [
    ...ngbModules,
    ...materialModules,
    ...pipes
  ],
  declarations: [
    ...pipes
  ]
})
export class TicketSystemUiModule {}
