import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

const modules: any[] = [
  TableModule,
  TagModule
];

@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class PrimengModule {}
