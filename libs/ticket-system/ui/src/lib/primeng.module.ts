import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';

const modules: any[] = [
  TableModule,
  ButtonModule,
  CardModule,
  TagModule,
  DividerModule,
  TooltipModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
